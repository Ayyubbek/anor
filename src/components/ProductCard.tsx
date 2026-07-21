import { Box, Button, Flex, Text } from '@mantine/core'
import { Link } from 'react-router'
import { modals } from '@mantine/modals'
import { notifications } from '@mantine/notifications'
import { useDeleteProduct } from '../hooks/useProductMutations'
import { CreateProductForm } from './products/CreateProductForm'
import type { IProductForm } from '../types/product'
import carImg from '../assets/icons/carIcon.svg'
import automatIcon from '../assets/icons/automat.svg'
import pbIcon from '../assets/icons/pb.svg'
import airCIcon from '../assets/icons/airC.svg'

// Brand color constants
const PRIMARY_COLOR = '#A30041'
const PRIMARY_HOVER_COLOR = '#7a0033'

// Reusable button styles
const primaryButtonStyles = {
  root: {
    backgroundColor: PRIMARY_COLOR,
    minHeight: 44,
    transition: 'background-color 150ms ease, transform 150ms ease',
    '&:hover': {
      backgroundColor: PRIMARY_HOVER_COLOR,
    },
  },
  label: {
    fontWeight: 600,
    textTransform: 'none',
  },
}

const deleteButtonStyles = {
  root: {
    borderColor: PRIMARY_COLOR,
    transition:
      'background-color 150ms ease, border-color 150ms ease, color 150ms ease',
    '&:hover:not(:disabled)': {
      backgroundColor: `rgba(163, 0, 65, 0.06)`,
    },
  },
  label: {
    fontWeight: 600,
    textTransform: 'none',
  },
}

const editButtonStyles = {
  root: {
    transition: 'background-color 150ms ease, border-color 150ms ease',
  },
  label: {
    fontWeight: 600,
    textTransform: 'none',
  },
}

interface ProductCardProps {
  id?: number
  title?: string
  category?: string
  price?: string
  image?: string
}

export const ProductCard = ({
  id,
  title = 'Mercedes',
  category = 'Sedan',
  price = '$25',
  image,
}: ProductCardProps) => {
  const path = id ? `/details/${id}` : '/details'
  const { mutate: deleteProduct, isPending: isDeleting } = useDeleteProduct()

  const handleDeleteClick = () => {
    if (!id) {
      notifications.show({
        title: 'Error',
        message: 'Cannot delete product without ID',
        color: 'red',
      })
      return
    }

    modals.openConfirmModal({
      title: 'Delete Product',
      children: (
        <Box>
          <Text size="sm">
            Are you sure you want to delete product{' '}
            <Text span fw={700} c={PRIMARY_COLOR}>
              "{title}"
            </Text>
            ?
          </Text>
        </Box>
      ),
      labels: { confirm: 'Delete', cancel: 'Cancel' },
      confirmProps: { color: 'red' },
      onConfirm: () => {
        deleteProduct(id, {
          onSuccess: () => {
            notifications.show({
              title: 'Success',
              message: 'Product deleted successfully',
              color: 'green',
            })
          },
          onError: (error) => {
            notifications.show({
              title: 'Error',
              message:
                error instanceof Error
                  ? error.message
                  : 'Failed to delete product',
              color: 'red',
            })
          },
        })
      },
    })
  }

  const handleEditClick = () => {
    if (!id) {
      notifications.show({
        title: 'Error',
        message: 'Cannot edit product without ID',
        color: 'red',
      })
      return
    }

    // Build initialValues from ProductCard props
    const priceNumber = parseFloat(price?.replace('$', '') || '0')
    const initialValues: IProductForm = {
      title: title || '',
      price: isNaN(priceNumber) ? 0 : priceNumber,
      description: '',
      categoryId: 1, // Default until real category ids are available
      images: image ? [image] : ['https://placehold.co/600x400'],
    }

    const modalId = modals.open({
      title: 'Edit Product',
      children: (
        <CreateProductForm
          mode="edit"
          productId={id}
          initialValues={initialValues}
          onSuccess={() => modals.close(modalId)}
        />
      ),
      size: 'lg',
      radius: 'md',
    })
  }

  const state = {
    id,
    title,
    category,
    price,
    image,
    specs: {
      gearBox: 'Automat',
      fuel: 'Petrol',
      doors: 2,
      airConditioner: 'Yes',
      seats: 5,
      distance: 500,
    },
    equipment: ['ABS', 'Air Bags', 'Cruise Control', 'Air Conditioner'],
  }

  return (
    <Box
      style={{
        width: '100%',
        background: '#fff',
        borderRadius: 20,
        padding: 20,
        boxShadow: '0 6px 18px rgba(15, 23, 42, 0.06)',
        transition: 'transform 150ms ease, box-shadow 150ms ease',
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100%',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = '0 10px 25px rgba(15, 23, 42, 0.12)'
        e.currentTarget.style.transform = 'translateY(-4px)'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = '0 6px 18px rgba(15, 23, 42, 0.06)'
        e.currentTarget.style.transform = 'none'
      }}
    >
      <Box
        style={{
          width: '100%',
          borderRadius: 20,
          overflow: 'hidden',
          background: '#fafafa',
          padding: 32,
          marginBottom: 24,
        }}
      >
        <img
          src={image || carImg}
          alt={title}
          onError={(e) => {
            e.currentTarget.src = carImg
          }}
          style={{
            width: '100%',
            height: 180,
            objectFit: 'contain',
            display: 'block',
          }}
        />
      </Box>

      <Flex
        justify="space-between"
        align="flex-start"
        style={{ marginTop: 16, marginBottom: 16 }}
      >
        <Box
          style={{
            minHeight: 52,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <Text
            fw={700}
            style={{
              fontSize: 18,
              lineHeight: '24px',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
            }}
          >
            {title}
          </Text>
          <Text size="sm" c="dimmed" style={{ fontSize: 14, marginTop: 8 }}>
            {category}
          </Text>
        </Box>

        <Box style={{ textAlign: 'right' }}>
          <Text fw={700} style={{ color: PRIMARY_COLOR, fontSize: 18 }}>
            {price}
          </Text>
          <Text size="xs" c="dimmed" style={{ fontSize: 12 }}>
            per day
          </Text>
        </Box>
      </Flex>

      <Flex align="center" gap={16} style={{ marginBottom: 20 }}>
        <Flex align="center" gap={6}>
          <img
            src={automatIcon}
            alt="automat"
            style={{ width: 18, height: 18 }}
          />
          <Text size="xs" c="dimmed" style={{ fontSize: 14 }}>
            Automat
          </Text>
        </Flex>

        <Flex align="center" gap={6}>
          <img src={pbIcon} alt="pb95" style={{ width: 18, height: 18 }} />
          <Text size="xs" c="dimmed" style={{ fontSize: 14 }}>
            PB 95
          </Text>
        </Flex>

        <Flex align="center" gap={6}>
          <img
            src={airCIcon}
            alt="air-conditioner"
            style={{ width: 18, height: 18 }}
          />
          <Text size="xs" c="dimmed" style={{ fontSize: 14 }}>
            Air Conditioner
          </Text>
        </Flex>
      </Flex>

      <Button
        component={Link}
        to={path}
        state={state}
        fullWidth
        radius="xl"
        size="md"
        styles={primaryButtonStyles}
        style={{ marginTop: 'auto' }}
      >
        View Details
      </Button>

      <Flex gap={12} style={{ marginTop: 16 }}>
        <Button
          flex={1}
          radius="xl"
          size="md"
          variant="default"
          onClick={handleEditClick}
          styles={editButtonStyles}
        >
          Edit
        </Button>

        <Button
          flex={1}
          radius="xl"
          size="md"
          variant="outline"
          color="red"
          onClick={handleDeleteClick}
          loading={isDeleting}
          disabled={isDeleting}
          styles={deleteButtonStyles}
        >
          Delete
        </Button>
      </Flex>
    </Box>
  )
}
