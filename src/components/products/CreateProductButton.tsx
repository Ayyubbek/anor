import { Button } from '@mantine/core'
import { modals } from '@mantine/modals'
import { CreateProductForm } from './CreateProductForm'

export const CreateProductButton = () => {
  const openModal = () => {
    const id = modals.open({
      title: 'Новый товар',
      children: <CreateProductForm onSuccess={() => modals.close(id)} />,
    })

    return id
  }

  return (
    <Button
      size="md"
      radius="xl"
      variant="filled"
      color="red"
      onClick={openModal}
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
      Добавить товар
    </Button>
  )
}
