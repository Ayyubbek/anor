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

  const fieldStyles = {
    input: {
      minHeight: 44,
      borderRadius: 24,
      transition: 'box-shadow 150ms ease, border-color 150ms ease',
    },
    label: {
      fontSize: 14,
      fontWeight: 600,
    },
    error: {
      fontSize: 12,
      lineHeight: 1.4,
      marginTop: 4,
    },
  }

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
      <Stack gap={20}>
        <TextInput
          label="Название"
          placeholder="Например, iPhone 15"
          size="md"
          radius="xl"
          withAsterisk
          styles={fieldStyles}
          {...form.getInputProps('title')}
        />

        <NumberInput
          label="Цена"
          placeholder="0"
          size="md"
          radius="xl"
          min={0}
          withAsterisk
          styles={fieldStyles}
          {...form.getInputProps('price')}
        />

        <Textarea
          label="Описание"
          placeholder="Пара слов о товаре"
          size="md"
          radius="xl"
          minRows={3}
          withAsterisk
          styles={fieldStyles}
          {...form.getInputProps('description')}
        />

        <Select
          label="Категория"
          placeholder="Выберите"
          size="md"
          radius="xl"
          withAsterisk
          styles={fieldStyles}
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

        <Button
          type="submit"
          loading={isPending}
          fullWidth
          size="md"
          radius="xl"
          color="red"
          styles={{
            root: {
              backgroundColor: '#A30041',
              borderColor: '#A30041',
              transition: 'background-color 150ms ease, transform 150ms ease',
              '&:hover': {
                backgroundColor: '#7a0033',
              },
            },
            label: {
              fontWeight: 600,
            },
          }}
        >
          Создать товар
        </Button>
      </Stack>
    </form>
  )
}
