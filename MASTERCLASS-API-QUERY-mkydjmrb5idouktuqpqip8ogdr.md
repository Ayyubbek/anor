# Мастеркласс: api.ts + TanStack Query + фильтрация

Проект: `anor-accelerator`.

API: **https://api.escuelajs.co/api/v1** (Platzi Fake Store). Бекенд поднимать не нужно.

План:

1. Разбор API
2. `src/api/api.ts`
3. Типы и запросы
4. `useEffect` vs `useQuery`
5. Фильтрация через URL

Файлы, которые появятся (структура проекта не меняется):

```
src/
├── api/
│   ├── api.ts                  ← axios-инстанс
│   └── products.ts             ← запросы товаров
├── components/
│   └── products/
│       ├── ProductCard.tsx
│       └── ProductFilter.tsx   ← кнопки категорий + поиск
├── hooks/
│   ├── useProducts.ts          ← useQuery
│   └── useSearchRequestParams.ts
├── pages/
│   └── ProductsPage.tsx
└── types/
    └── product.ts
```

---

# 1. Разбор API

```bash
npm i axios
```

Открыть в браузере, посмотреть ответы:

```
https://api.escuelajs.co/api/v1/products
https://api.escuelajs.co/api/v1/products?offset=0&limit=6
https://api.escuelajs.co/api/v1/products?title=shirt
https://api.escuelajs.co/api/v1/products?categoryId=1
https://api.escuelajs.co/api/v1/products?price_min=50&price_max=200
https://api.escuelajs.co/api/v1/categories
https://api.escuelajs.co/api/v1/products/24
```

Один товар:

```json
{
  "id": 24,
  "title": "Sleek Modern Laptop for Professionals",
  "slug": "sleek-modern-laptop-for-professionals",
  "price": 97,
  "description": "Experience cutting-edge technology...",
  "category": { "id": 2, "name": "Electronics", "slug": "electronics", "image": "https://i.imgur.com/ZANVnHE.jpeg" },
  "images": ["https://i.imgur.com/ItHcq7o.jpeg"]
}
```
---

# 2. `src/api/api.ts`

Для старта достаточно этого:

```ts
import axios from 'axios'

export const $api = axios.create({
  baseURL: 'https://api.escuelajs.co/api/v1',
  timeout: 15_000,
})
```

### Интерцепторы — дописываем в тот же файл после первого работающего запроса

```ts
import axios from 'axios'

export const $api = axios.create({
  baseURL: 'https://api.escuelajs.co/api/v1',
  timeout: 15_000,
})

$api.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  // Адаптер: приложение говорит search, API — title
  const params = { ...config.params }

  if (params.search) {
    params.title = params.search
    delete params.search
  }

  config.params = params

  return config
})

$api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('access_token')
      globalThis.location.href = '/'
    }
    return Promise.reject(error)
  },
)
```

Токен и перевод параметров — в одном месте. Сменится бекенд — правим один файл, а не 40 компонентов.

---

# 3. Типы и запросы

### `src/types/product.ts`

```ts
export interface ICategory {
  id: number
  name: string
  slug: string
  image: string
}

export interface IProduct {
  id: number
  title: string
  slug: string
  price: number
  description: string
  category: ICategory
  images: string[]
}

/** Общие параметры любого списочного запроса */
export interface ICommonParams {
  page?: string
  size?: string
  search?: string
}

export type TProductParams = ICommonParams & {
  categoryId?: string
}
```

### `src/api/products.ts`

```ts
import type { ICategory, IProduct, TProductParams } from '../types/product.ts'
import { $api } from './api.ts'

const baseURL = '/products'

export const productsApi = {
  get: (params?: TProductParams) => $api.get<IProduct[]>(baseURL, { params }),
  getById: (id: IProduct['id']) => $api.get<IProduct>(`${baseURL}/${id}`),
  create: (data: Partial<IProduct>) => $api.post<IProduct>(baseURL, data),
  update: (id: IProduct['id'], data: Partial<IProduct>) =>
    $api.put<IProduct>(`${baseURL}/${id}`, data),
  delete: (id: IProduct['id']) => $api.delete(`${baseURL}/${id}`),
}

export const categoriesApi = {
  get: () => $api.get<ICategory[]>('/categories'),
}
```

Никакого React. Компонент этот файл не импортирует — он импортирует хук.

---

# 4. `useEffect` vs `useQuery`

## Вариант 1 — `useEffect` (показать и стереть)

```tsx
import { useEffect, useState } from 'react'
import { productsApi } from '../../api/products.ts'
import type { IProduct } from '../../types/product.ts'

export const ProductListEffect = () => {
  const [data, setData] = useState<IProduct[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    setIsLoading(true)
    productsApi
      .get({ page: '1', size: '6' })
      .then((resp) => setData(resp.data))
      .catch((e) => setError(e.message))
      .finally(() => setIsLoading(false))
  }, [])

  if (isLoading) return <p>Загрузка...</p>
  if (error) return <p>{error}</p>

  return (
    <ul>
      {data.map((p) => (
        <li key={p.id}>{p.title}</li>
      ))}
    </ul>
  )
}
```

3 `useState`, нет кеша, нет отмены запроса, при каждом монтировании — новый запрос, `refetch` писать руками.

## Вариант 2 — TanStack Query

```bash
npm i -D @tanstack/react-query-devtools
```

### `src/App.tsx` — правим уже существующий `QueryClient`

```tsx
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
// ...остальные импорты как были

const client = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={client}>
      <MantineProvider theme={theme}>
        <RouterProvider router={router} />
      </MantineProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}

export default App
```

`new QueryClient()` — вне компонента, иначе кеш обнуляется на каждом рендере.

### `src/hooks/useProducts.ts`

Пока без фильтров и пагинации — просто получить список:

```ts
import { useQuery } from '@tanstack/react-query'
import { productsApi } from '../api/products.ts'

export const PRODUCTS_KEY = 'products-key'

export const useProducts = () =>
  useQuery({
    queryKey: [PRODUCTS_KEY], // адрес данных в кеше
    queryFn: () => productsApi.get().then((resp) => resp.data),
  })
```

### То же, что вариант 1 — но целиком

```tsx
import { useProducts } from '../../hooks/useProducts.ts'

export const ProductList = () => {
  const { data, isLoading, isError, error } = useProducts()

  if (isLoading) return <p>Загрузка...</p>
  if (isError) return <p>{error.message}</p>

  return (
    <ul>
      {data?.map((p) => (
        <li key={p.id}>{p.title}</li>
      ))}
    </ul>
  )
}
```

Ни одного `useState`. `data` типизирован как `IProduct[]` — тип пришёл из `$api.get<IProduct[]>`.

### Ещё два запроса в тот же файл

```ts
export const CATEGORIES_KEY = 'categories-key'

export const useProductById = (id?: string) =>
  useQuery({
    queryKey: [PRODUCTS_KEY, id],
    queryFn: () => productsApi.getById(Number(id)).then((resp) => resp.data),
    enabled: Boolean(id), // без id запрос не уйдёт
  })

export const useCategories = () =>
  useQuery({
    queryKey: [CATEGORIES_KEY],
    queryFn: () => categoriesApi.get().then((resp) => resp.data),
    staleTime: Infinity, // категории не меняются — не перезапрашиваем
  })
```

Не забыть добавить `categoriesApi` в импорт: `import { categoriesApi, productsApi } from '../api/products.ts'`

### Показать в DevTools

Вставить `<ProductList />` на любую страницу и открыть панель React Query:

- вкладка **Network**: ушёл **один** запрос `GET /products`
- панель Query: ключ `["products-key"]`, данные лежат в кеше
- перейти на другую страницу и вернуться → компонент рендерится **сразу** из кеша

---

# 5. Фильтрация через URL

Фильтруем ровно двумя вещами: **кнопки категорий** + **один инпут поиска**.

Главная мысль: значения фильтров **не хранятся в компоненте**. Они лежат в URL.

```
/products?page=1&size=6&categoryId=2&search=shirt
```

Что это даёт: ссылку можно отправить коллеге, F5 не сбрасывает фильтр, кнопка «назад»
работает сама собой. И, главное, у нас **один источник правды** — и для UI, и для запроса.

Схема на 4 файла:

```
useSearchRequestParams  ← читает и пишет URL
        ↓
ProductFilter           ← кнопки + инпут (пишут в URL)
ProductsPage            ← читает URL → отдаёт в useProducts → рисует список
        ↓
useProducts             ← useQuery
```

## Шаг 1. `src/hooks/useSearchRequestParams.ts`

Обёртка над `useSearchParams` из react-router. Всё, что она делает:
читает параметры из URL, пишет параметры в URL, чистит их.

```ts
import { useSearchParams } from 'react-router'

interface QueryParam<T> {
  key: keyof T
  value: string | number | undefined | null
}

interface Options<T> {
  defaultParams?: Partial<T>
}

export function useSearchRequestParams<T>(options?: Options<T>) {
  const [searchParams, setSearchParams] = useSearchParams()

  // ?page=1&categoryId=2  →  { page: '1', categoryId: '2' }
  const getParams = () =>
    Object.fromEntries(searchParams.entries()) as unknown as T

  // Дефолты (page, size) подставляем один раз при первом заходе на страницу
  const getDefaultSearchParams = () => {
    if (options?.defaultParams) {
      Object.entries(options.defaultParams).forEach(([key, value]) => {
        if (!searchParams.has(key)) {
          searchParams.set(key, String(value))
        }
      })
    }

    return getParams()
  }

  const handleSetSearchParams = ({ key, value }: QueryParam<T>) => {
    // Сменили фильтр → возврат на первую страницу.
    // Иначе останемся на 5-й странице результата, в котором всего 2 страницы.
    if (searchParams.get('page')) searchParams.set('page', '1')

    const stringValue = value?.toString() ?? ''

    if (stringValue !== '') {
      searchParams.set(key.toString(), stringValue)
    } else {
      // Пустой фильтр не должен висеть в URL как ?search=
      searchParams.delete(key.toString())
    }

    setSearchParams(searchParams)
  }

  return {
    searchParams: getParams(),
    getDefaultSearchParams,
    setSearchParams: handleSetSearchParams,
  }
}
```

Три функции — и всё. Разобрать с группой: `getParams` (URL → объект),
`handleSetSearchParams` (объект → URL), сброс `page` при смене фильтра.

## Шаг 2. `useProducts` теперь принимает параметры

Переписываем хук из блока 4:

```ts
import { useQuery } from '@tanstack/react-query'
import { productsApi } from '../api/products.ts'
import type { TProductParams } from '../types/product.ts'

export const PRODUCTS_KEY = 'products-key'

export const useProducts = (params?: TProductParams) => {
  const { page, size, ...filters } = params ?? {}

  const current = Number(page ?? 1)
  const limit = Number(size ?? 6)
  const start = (current - 1) * limit

  return useQuery({
    // В ключе только ФИЛЬТРЫ (categoryId, search).
    // page/size сюда не кладём: страница — это не другие данные,
    // а другой кусок тех же данных.
    queryKey: [PRODUCTS_KEY, filters],

    // API не отдаёт общее количество записей, поэтому забираем
    // весь отфильтрованный список (тут их ~86) и режем сами.
    queryFn: () => productsApi.get(filters).then((resp) => resp.data),

    // select работает поверх КЕША и не вызывает запрос.
    // Поэтому переключение страниц — вообще без обращений к сети.
    select: (all) => ({
      data: all.slice(start, start + limit),
      total: all.length,
    }),
  })
}
```

> На проде так нельзя: при 50 000 записей клиент не должен качать всё ради пагинации.
> Там бекенд отдаёт общее количество в заголовке, и хук берёт число из него.

Из-за `select` тип `data` меняется с `IProduct[]` на `{ data, total }` — в компоненте это
будет `data?.data` и `data?.total`.

## Шаг 3. `src/components/products/ProductFilter.tsx`

Сам фильтр. Ничего, кроме кнопок и инпута, — оба просто пишут в URL.

```tsx
import { Button, Group, TextInput } from '@mantine/core'
import { useDebouncedValue } from '@mantine/hooks'
import { RiSearchLine } from '@remixicon/react'
import { useEffect, useState } from 'react'
import { useCategories } from '../../hooks/useProducts.ts'
import { useSearchRequestParams } from '../../hooks/useSearchRequestParams.ts'
import type { TProductParams } from '../../types/product.ts'

export const ProductFilter = () => {
  const { searchParams, setSearchParams } =
    useSearchRequestParams<TProductParams>()

  const { data: categories } = useCategories()

  // Активная категория — из URL, а не из useState
  const activeCategory = searchParams.categoryId ?? ''

  // useState нужен ТОЛЬКО инпуту: он должен реагировать на каждое нажатие.
  // В URL уходит уже "успокоившееся" значение — через 400 мс после последней буквы.
  const [searchValue, setSearchValue] = useState(searchParams.search ?? '')
  const [debouncedSearch] = useDebouncedValue(searchValue, 400)

  useEffect(() => {
    setSearchParams({ key: 'search', value: debouncedSearch })
  }, [debouncedSearch])

  const onCategoryClick = (categoryId: string) => {
    setSearchParams({ key: 'categoryId', value: categoryId })
  }

  return (
    <Group justify="center" gap="md">
      {/* Пустая строка = "все категории": параметр просто удалится из URL */}
      <Button
        radius="xl"
        variant={activeCategory === '' ? 'filled' : 'default'}
        onClick={() => onCategoryClick('')}
      >
        Все
      </Button>

      {categories?.map((category) => (
        <Button
          key={category.id}
          radius="xl"
          variant={activeCategory === String(category.id) ? 'filled' : 'default'}
          onClick={() => onCategoryClick(String(category.id))}
        >
          {category.name}
        </Button>
      ))}

      <TextInput
        w={260}
        radius="xl"
        placeholder="Поиск по названию"
        leftSection={<RiSearchLine size={16} />}
        value={searchValue}
        onChange={(event) => setSearchValue(event.currentTarget.value)}
      />
    </Group>
  )
}
```

Разобрать с группой:

- активная кнопка подсвечивается по значению **из URL** (`activeCategory`), а не по `useState`;
- «Все» — это пустая строка, и `setSearchParams` сам удалит параметр из URL;
- `useState` остался только у инпута: без него нельзя печатать. Но в URL значение попадает
  с задержкой 400 мс — иначе запрос уходил бы на каждую букву.

## Шаг 4. `src/components/products/ProductCard.tsx`

```tsx
import { Badge, Card, Group, Image, Text } from '@mantine/core'
import type { IProduct } from '../../types/product.ts'

export const ProductCard = ({ product }: { product: IProduct }) => (
  <Card shadow="sm" padding="lg" radius="md" withBorder>
    <Card.Section>
      <Image
        src={product.images?.[0]}
        h={180}
        alt={product.title}
        fallbackSrc="https://placehold.co/600x400?text=No+image"
      />
    </Card.Section>

    <Group justify="space-between" mt="md">
      <Text fw={600} lineClamp={1}>
        {product.title}
      </Text>
      <Badge color="orange">${product.price}</Badge>
    </Group>

    <Text size="sm" c="dimmed" lineClamp={2} mt="xs">
      {product.description}
    </Text>
  </Card>
)
```

## Шаг 5. `src/pages/ProductsPage.tsx`

Страница читает параметры из URL, отдаёт их в хук и рисует результат.

```tsx
import {
  Alert,
  Box,
  Center,
  Loader,
  Pagination,
  SimpleGrid,
  Stack,
  Text,
  Title,
} from '@mantine/core'
import { FooterComponent } from '../components/FooterComponent.tsx'
import { HeaderComponent } from '../components/HeaderComponent.tsx'
import { PartnerLogos } from '../components/PartnerLogos.tsx'
import { ProductCard } from '../components/products/ProductCard.tsx'
import { ProductFilter } from '../components/products/ProductFilter.tsx'
import { useProducts } from '../hooks/useProducts.ts'
import { useSearchRequestParams } from '../hooks/useSearchRequestParams.ts'
import type { TProductParams } from '../types/product.ts'

const PAGE_SIZE = 6

export function ProductsPage() {
  const { getDefaultSearchParams, setSearchParams } =
    useSearchRequestParams<TProductParams>({
      defaultParams: { page: '1', size: String(PAGE_SIZE) },
    })

  const params = getDefaultSearchParams()

  // Параметры пришли из URL — страница ничего не хранит у себя
  const { data, isLoading, isError, error } = useProducts(params)

  const products = data?.data ?? []
  const totalPages = Math.ceil((data?.total ?? 0) / PAGE_SIZE)

  return (
    <Stack gap={0}>
      <HeaderComponent />

      <Box px={72} py={60}>
        <Stack gap={40} align="center">
          <Title order={2}>Каталог</Title>

          <ProductFilter />

          {isLoading ? (
            <Center h={200}>
              <Loader color="orange" />
            </Center>
          ) : isError ? (
            <Alert color="red" title="Не удалось загрузить товары">
              {error.message}
            </Alert>
          ) : products.length === 0 ? (
            <Text c="dimmed">Ничего не найдено</Text>
          ) : (
            <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }} spacing="xl" w="100%">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </SimpleGrid>
          )}

          {totalPages > 1 && (
            <Pagination
              radius="xl"
              total={totalPages}
              value={Number(params.page ?? 1)}
              onChange={(page) => setSearchParams({ key: 'page', value: page })}
            />
          )}
        </Stack>
      </Box>

      <PartnerLogos />

      <FooterComponent />
    </Stack>
  )
}
```

## Демонстрация на экране

1. Клик по категории **Electronics** → URL: `?page=1&size=6&categoryId=2`
2. Скопировать URL в новую вкладку → фильтр применён, кнопка подсвечена
3. F5 → фильтр на месте; «назад» → предыдущая категория
4. Network: ушёл `?categoryId=2` — `page`/`size` на сервер не уходят, страницы режем на клиенте
5. Набрать «shirt» → в Network `?title=shirt`, хотя в URL приложения `search=shirt`.
   Сработал адаптер в интерцепторе.
6. Быстро набрать «shirt» → **один** запрос, а не пять (debounce 400 мс)
7. Electronics → Clothes → Electronics: третий клик **не делает запрос** (кеш по `queryKey`)
8. Страница 1 → 2 → 1: запросов **нет вообще** (`select` режет данные из кеша)

---

# Правила

1. Компонент не знает про `axios` — только хук.
2. В `queryKey` — всё, от чего зависит **ответ сервера**, и ничего лишнего.
3. Преобразовать данные без запроса — это `select`, а не новый `queryKey`.
4. Фильтры — в URL, не в `useState`. `useState` остаётся только у инпута, ради печати.
5. Сменил фильтр — сбрось страницу на первую.
6. Что нужно каждому запросу — в интерцептор.

---

# Домашнее задание

1. Кнопка «Сбросить фильтры»: очистить `categoryId` и `search` в URL.
2. Фильтр по цене (`price_min` / `price_max`) — добавить в `TProductParams` и в `ProductFilter`.
3. `DetailsPage` → `useProductById(id)`.
4. `useMutation` + инвалидация кеша:

```ts
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { productsApi } from '../api/products.ts'
import type { IProduct } from '../types/product.ts'
import { PRODUCTS_KEY } from './useProducts.ts'

export const useCreateProduct = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: Partial<IProduct>) => productsApi.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [PRODUCTS_KEY] })
    },
  })
}
```

---

# Чеклист

Создать:
`src/api/api.ts` · `src/api/products.ts` · `src/types/product.ts` · `src/hooks/useProducts.ts` · `src/hooks/useSearchRequestParams.ts` · `src/components/products/ProductCard.tsx` · `src/components/products/ProductFilter.tsx`

Изменить:
`src/App.tsx` (devtools) · `src/pages/ProductsPage.tsx`

Установить:
`npm i axios` · `npm i -D @tanstack/react-query-devtools`
