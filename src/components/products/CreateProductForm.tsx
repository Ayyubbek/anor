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
import { useCategories } from '../../hooks/useProducts'
import { useCreateProduct } from '../../hooks/useProductMutations'
import type { IProductForm } from '../../types/product'

interface ICreateProductFormProps {
  onSuccess?: () => void
}

export const CreateProductForm = ({ onSuccess }: ICreateProductFormProps) => {
  const { data: categories } = useCategories()
  const { mutate, isPending } = useCreateProduct()

  const form = useForm<IProductForm>({
    initialValues: {
      title: '',
      price: 0,
      description: '',
      categoryId: 0,
      images: ['https://placehold.co/600x400'],
    },

    validate: {
      title: (value) => (value.trim().length < 3 ? 'Минимум 3 символа' : null),
      price: (value) => (value <= 0 ? 'Цена должна быть больше 0' : null),
      description: (value) =>
        value.trim().length < 10 ? 'Минимум 10 символов' : null,
      categoryId: (value) => (value ? null : 'Выберите категорию'),
    },
  })

  const handleSubmit = (values: IProductForm) => {
    mutate(values, {
      onSuccess: () => {
        notifications.show({ message: 'Товар создан', color: 'green' })
        form.reset()
        onSuccess?.()
      },
      onError: (error) => {
        notifications.show({
          message: error instanceof Error ? error.message : 'Ошибка',
          color: 'red',
        })
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
