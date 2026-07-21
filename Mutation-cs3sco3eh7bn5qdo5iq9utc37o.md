# Мутации: POST / PUT + useMutation + Mantine useForm

Продолжение урока про `api.ts` и TanStack Query. Тут — **запись** данных: создать товар, изменить, удалить.

API: **https://api.escuelajs.co/api/v1** (Platzi Fake Store).

План:

1. Query vs Mutation — в чём разница
2. Тип payload на создание (он **не** равен `IProduct`)
3. Дополняем `productsApi` (`create` / `update` / `delete`)
4. Вариант А — «на голом axios» (как многие пишут сначала)
5. Вариант Б — `useMutation` (как надо)
6. Все состояния и колбэки `useMutation`
7. Форма создания товара на Mantine `useForm`
8. `invalidateQueries` — почему список обновляется сам

---

# 1. Query vs Mutation

`useQuery` — **читает** данные. Запускается сам, кеширует, дедуплицирует.

`useMutation` — **меняет** данные (POST / PUT / PATCH / DELETE). Не запускается сам,
ничего не кеширует. Ты сам вызываешь `mutate()` в нужный момент (по клику, по сабмиту формы).

| | `useQuery` | `useMutation` |
|---|---|---|
| Когда срабатывает | сам, при рендере | по вызову `mutate()` |
| Метод HTTP | GET | POST / PUT / PATCH / DELETE |
| Кеш | да | нет |
| Флаг загрузки | `isLoading` | `isPending` |
| Результат | `data` | `data` (ответ сервера) + `mutateAsync` |

Правило: **читаешь — `useQuery`, пишешь — `useMutation`.**

---

# 2. Тип payload на создание

Ловушка, о которую спотыкаются все. Товар **приходит** с сервера вот таким:

```json
{
  "id": 24,
  "title": "Laptop",
  "price": 97,
  "description": "...",
  "category": { "id": 2, "name": "Electronics", "slug": "...", "image": "..." },
  "images": ["https://..."]
}
```

А **отправлять** на создание нужно другое — без `id`, без вложенного `category`,
зато с `categoryId` (число) и `images` (массив строк):

```json
{
  "title": "Laptop",
  "price": 97,
  "description": "...",
  "categoryId": 2,
  "images": ["https://..."]
}
```

Поэтому тип ответа (`IProduct`) и тип запроса — **разные типы**. Добавляем в `src/types/product.ts`:

```ts
/** Что ОТПРАВЛЯЕМ на создание/изменение товара (не то же, что приходит) */
export interface IProductForm {
  title: string
  price: number
  description: string
  categoryId: number
  images: string[]
}
```

> Классическая ошибка новичка — слать обратно ровно то, что пришло (`category` объектом).
> Сервер такой payload не поймёт. Тип запроса описываем отдельно.

---

# 3. Дополняем `src/api/products.ts`

`create` и `update` теперь принимают `IProductForm`, а не `Partial<IProduct>`:

```ts
import type {
  ICategory,
  IProduct,
  IProductForm,
  TProductParams,
} from '../types/product.ts'
import { $api } from './api.ts'

const baseURL = '/products'

export const productsApi = {
  get: (params?: TProductParams) => $api.get<IProduct[]>(baseURL, { params }),
  getById: (id: IProduct['id']) => $api.get<IProduct>(`${baseURL}/${id}`),

  // POST /products — создать
  create: (data: IProductForm) => $api.post<IProduct>(baseURL, data),

  // PUT /products/:id — изменить целиком
  update: (id: IProduct['id'], data: Partial<IProductForm>) =>
    $api.put<IProduct>(`${baseURL}/${id}`, data),

  // DELETE /products/:id — удалить
  delete: (id: IProduct['id']) => $api.delete<boolean>(`${baseURL}/${id}`),
}

export const categoriesApi = {
  get: () => $api.get<ICategory[]>('/categories'),
}
```

`$api.post<IProduct>(...)` — дженерик описывает, что **вернёт** сервер (созданный товар с `id`).
`data` типизируется тем, что мы передаём аргументом.

---

# 4. Вариант А — «на голом axios»

Так пишут, пока не узнают про `useMutation`. Работает, но многословно.

```tsx
import { Button } from '@mantine/core'
import { useState } from 'react'
import { productsApi } from '../../api/products.ts'
import type { IProductForm } from '../../types/product.ts'

export const CreateProductManual = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [createdId, setCreatedId] = useState<number | null>(null)

  const handleCreate = async () => {
    const payload: IProductForm = {
      title: 'Новый товар',
      price: 100,
      description: 'Описание',
      categoryId: 1,
      images: ['https://placehold.co/600x400'],
    }

    setIsLoading(true)
    setError(null)
    try {
      const resp = await productsApi.create(payload)
      setCreatedId(resp.data.id)
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Ошибка')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div>
      <Button onClick={handleCreate} loading={isLoading}>
        Создать
      </Button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {createdId && <p>Создан товар #{createdId}</p>}
    </div>
  )
}
```

Что тут плохо:

- **3 `useState`** руками на каждую мутацию — `isLoading`, `error`, результат;
- `try / catch / finally` — копипаста в каждом обработчике;
- список товаров **не обновится** — надо вручную дёргать перезапрос;
- нельзя из компонента-родителя узнать, идёт ли запрос.

---

# 5. Вариант Б — `useMutation`

То же самое, но состояния (`isPending`, `isError`, `error`, `data`) даёт хук.

### `src/hooks/useProductMutations.ts`

```ts
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { productsApi } from '../api/products.ts'
import type { IProduct, IProductForm } from '../types/product.ts'
import { PRODUCTS_KEY } from './useProducts.ts'

// --- Создание ---
export const useCreateProduct = () => {
  const queryClient = useQueryClient()

  return useMutation({
    // Дженерики: <ЧтоВернётСервер, ТипОшибки, ЧтоПередаёмВmutate>
    mutationFn: (data: IProductForm) => productsApi.create(data).then((r) => r.data),

    onSuccess: () => {
      // Список товаров помечаем устаревшим → useQuery перезапросит его сам
      queryClient.invalidateQueries({ queryKey: [PRODUCTS_KEY] })
    },
  })
}

// --- Изменение ---
export const useUpdateProduct = () => {
  const queryClient = useQueryClient()

  return useMutation({
    // В mutate передаём объект { id, data } — аргумент всегда ОДИН,
    // поэтому связанные значения заворачиваем в объект
    mutationFn: ({ id, data }: { id: number; data: Partial<IProductForm> }) =>
      productsApi.update(id, data).then((r) => r.data),

    onSuccess: (updated: IProduct) => {
      queryClient.invalidateQueries({ queryKey: [PRODUCTS_KEY] })
      // Точечно обновляем и кеш конкретного товара
      queryClient.setQueryData([PRODUCTS_KEY, String(updated.id)], updated)
    },
  })
}

// --- Удаление ---
export const useDeleteProduct = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: number) => productsApi.delete(id).then((r) => r.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [PRODUCTS_KEY] })
    },
  })
}
```

### Использование — коротко

```tsx
const { mutate, isPending } = useCreateProduct()

<Button
  loading={isPending}
  onClick={() =>
    mutate({
      title: 'Новый товар',
      price: 100,
      description: 'Описание',
      categoryId: 1,
      images: ['https://placehold.co/600x400'],
    })
  }
>
  Создать
</Button>
```

Ни одного `useState`, ни одного `try/catch`. И список сам обновится — за счёт `invalidateQueries`.

---

# 6. Все состояния и колбэки `useMutation`

Полная «симуляция» того, что даёт хук:

```tsx
const {
  mutate, // (variables) => void         — запустить, «выстрелил и забыл»
  mutateAsync, // (variables) => Promise  — то же, но можно await / try-catch
  data, // ответ сервера после успеха
  error, // объект ошибки после провала
  isIdle, // ещё ни разу не вызывали
  isPending, // запрос идёт (аналог isLoading у useQuery)
  isSuccess, // успех
  isError, // ошибка
  reset, // сбросить состояние в idle
} = useCreateProduct()
```

### Колбэки жизненного цикла

Указываются либо в самом хуке (`useMutation({ ... })`), либо при вызове `mutate(vars, { ... })`:

```ts
mutate(payload, {
  onSuccess: (data) => {
    // data — ответ сервера. Тут: закрыть модалку, показать уведомление
  },
  onError: (error) => {
    // показать ошибку
  },
  onSettled: () => {
    // выполнится В ЛЮБОМ случае — и при успехе, и при ошибке (как finally)
  },
})
```

Порядок: сначала колбэки из `useMutation({...})`, потом — из `mutate(vars, {...})`.

### `mutate` vs `mutateAsync`

```ts
// mutate — ничего не возвращает, ошибку ловит onError. Достаточно в 90% случаев.
mutate(payload)

// mutateAsync — возвращает Promise. Нужен, когда после мутации надо что-то await'ить
const handleSubmit = async () => {
  try {
    const created = await mutateAsync(payload)
    navigate(`/products/${created.id}`)
  } catch (e) {
    // здесь ошибку ловим сами
  }
}
```

Правило: `mutate` — по умолчанию. `mutateAsync` — только если реально нужен `await` результата.

---

# 7. Форма создания товара на Mantine `useForm`

Собираем всё вместе: форма + валидация + `useCreateProduct`.

### `src/components/products/CreateProductForm.tsx`

```tsx
import {
  Button,
  NumberInput,
  Select,
  Stack,
  Textarea,
  TextInput,
} from '@mantine/core'
import { useForm } from '@mantine/form'
import { notifications } from '@mantine/notifications'
import { useCategories } from '../../hooks/useProducts.ts'
import { useCreateProduct } from '../../hooks/useProductMutations.ts'
import type { IProductForm } from '../../types/product.ts'

interface ICreateProductFormProps {
  onSuccess?: () => void
}

export const CreateProductForm = ({ onSuccess }: ICreateProductFormProps) => {
  const { data: categories } = useCategories()
  const { mutate, isPending } = useCreateProduct()

  const form = useForm<IProductForm>({
    // начальные значения = «пустая» форма
    initialValues: {
      title: '',
      price: 0,
      description: '',
      categoryId: 0,
      images: ['https://placehold.co/600x400'],
    },

    // валидация: функция на поле возвращает текст ошибки или null
    validate: {
      title: (value) =>
        value.trim().length < 3 ? 'Минимум 3 символа' : null,
      price: (value) => (value <= 0 ? 'Цена должна быть больше 0' : null),
      description: (value) =>
        value.trim().length < 10 ? 'Минимум 10 символов' : null,
      categoryId: (value) => (value ? null : 'Выберите категорию'),
    },
  })

  // form.onSubmit сам прогонит validate; сюда попадут только валидные values
  const handleSubmit = (values: IProductForm) => {
    mutate(values, {
      onSuccess: () => {
        notifications.show({ message: 'Товар создан', color: 'green' })
        form.reset()
        onSuccess?.() // например, закрыть модалку
      },
      onError: (error) => {
        notifications.show({ message: error.message, color: 'red' })
      },
    })
  }

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <Stack>
        <TextInput
          label="Название"
          placeholder="Например, iPhone 15"
          withAsterisk
          {...form.getInputProps('title')}
        />

        <NumberInput
          label="Цена"
          placeholder="0"
          min={0}
          withAsterisk
          {...form.getInputProps('price')}
        />

        <Textarea
          label="Описание"
          placeholder="Пара слов о товаре"
          minRows={3}
          withAsterisk
          {...form.getInputProps('description')}
        />

        <Select
          label="Категория"
          placeholder="Выберите"
          withAsterisk
          data={
            categories?.map((c) => ({
              value: String(c.id),
              label: c.name,
            })) ?? []
          }
          // Select отдаёт строку, а API ждёт число — конвертируем
          value={form.values.categoryId ? String(form.values.categoryId) : null}
          onChange={(value) => form.setFieldValue('categoryId', Number(value))}
          error={form.errors.categoryId}
        />

        <Button type="submit" loading={isPending}>
          Создать товар
        </Button>
      </Stack>
    </form>
  )
}
```

Что показать группе на этом коде:

- **`useForm<IProductForm>`** — форма типизирована тем же типом, что уходит в API. Опечатка в
  имени поля → ошибка компиляции.
- **`form.getInputProps('title')`** — одной строкой прикручивает `value`, `onChange`, `error`.
- **`form.onSubmit(handleSubmit)`** — сначала гоняет `validate`; если есть ошибки, `handleSubmit`
  **не вызовется**, ошибки сами появятся под полями.
- **`Select`** — единственное место, где нужен ручной `onChange`: Mantine `Select` работает со
  строками, а `categoryId` у нас число. Показать, зачем `Number(value)`.
- **`form.reset()`** в `onSuccess` — очистить форму после успеха.

### Открыть форму в модалке (как в billmaster)

```tsx
import { Button } from '@mantine/core'
import { modals } from '@mantine/modals'
import { CreateProductForm } from './CreateProductForm.tsx'

export const CreateProductButton = () => {
  const openModal = () => {
    const id = modals.open({
      title: 'Новый товар',
      children: <CreateProductForm onSuccess={() => modals.close(id)} />,
    })
  }

  return <Button onClick={openModal}>Добавить товар</Button>
}
```

---

# 8. `invalidateQueries` — почему список обновляется сам

Сердце связки Query + Mutation. Разобрать медленно.

```ts
onSuccess: () => {
  queryClient.invalidateQueries({ queryKey: [PRODUCTS_KEY] })
}
```

Что происходит по шагам:

1. Создали товар → сервер ответил 201.
2. `invalidateQueries` помечает **все** запросы с ключом `[PRODUCTS_KEY, ...]` как «устаревшие».
3. TanStack Query видит, что на экране висит активный `useProducts(...)` с таким ключом.
4. Он **сам** перезапрашивает его → список на странице обновляется. **Без единой строки в компоненте.**

Именно поэтому фильтры и пагинацию мы клали в `queryKey`: одна строка `invalidateQueries`
обновляет список при **любом** активном фильтре.

### Вопрос группе

> Что будет, если убрать `invalidateQueries` из `onSuccess`?

Ответ: товар создастся на сервере, но в списке он появится только после того, как данные
сами протухнут по `staleTime`, или после F5. Пользователь нажал «Создать», товара нет —
«баг». На деле — забытый `invalidateQueries`.

### Альтернатива — `setQueryData` (без запроса)

Когда не хочется лишнего GET, можно дописать созданный товар в кеш руками:

```ts
onSuccess: (created) => {
  queryClient.setQueryData<IProduct[]>([PRODUCTS_KEY], (old) =>
    old ? [created, ...old] : [created],
  )
}
```

`invalidateQueries` — «перезапроси, чтобы наверняка». `setQueryData` — «я сам знаю новый
результат, запрос не нужен». Для урока хватает `invalidateQueries`.

---

# Итог: axios vs useMutation

| | голый axios | `useMutation` |
|---|---|---|
| Загрузка | `useState` руками | `isPending` |
| Ошибка | `try/catch` + `useState` | `isError` / `error` |
| Обновить список | вручную | `invalidateQueries` в `onSuccess` |
| Форма | сам собираешь payload | `useForm` + `mutate(values)` |
| Повтор кода | в каждом обработчике | один хук на всё приложение |

**Правило дня:** читаешь — `useQuery`, пишешь — `useMutation`. Тип ответа и тип запроса —
разные типы. Список после мутации обновляет `invalidateQueries`, а не компонент.

---

# Домашнее задание

1. Кнопка «Удалить» на `ProductCard` через `useDeleteProduct` + подтверждение `modals.openConfirmModal`.
2. Форма редактирования: тот же `CreateProductForm`, но с `initialValues` из существующего товара
   и `useUpdateProduct` вместо create.
3. Показать `isPending` на кнопке удаления, чтобы нельзя было кликнуть дважды.
4. Заменить `invalidateQueries` на `setQueryData` в `useCreateProduct` и в Network убедиться,
   что лишнего GET-запроса **нет**.
