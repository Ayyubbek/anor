import { Box, Button, Flex, Text } from '@mantine/core'
import { Link } from 'react-router'
import { useState } from 'react'
import carImg from '../assets/icons/carIcon.svg'
import automatIcon from '../assets/icons/automat.svg'
import pbIcon from '../assets/icons/pb.svg'
import airCIcon from '../assets/icons/airC.svg'

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
  const [isHovered, setIsHovered] = useState(false)
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
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        width: '100%',
        background: '#fff',
        borderRadius: 20,
        padding: 20,
        boxShadow: isHovered
          ? '0 10px 25px rgba(15, 23, 42, 0.12)'
          : '0 6px 18px rgba(15, 23, 42, 0.06)',
        transform: isHovered ? 'translateY(-4px)' : 'none',
        transition: 'transform 150ms ease, box-shadow 150ms ease',
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100%',
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
          <Text fw={700} style={{ color: '#A30041', fontSize: 18 }}>
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
        styles={{
          root: {
            backgroundColor: '#A30041',
            minHeight: 44,
            transition: 'background-color 150ms ease, transform 150ms ease',
            '&:hover': {
              backgroundColor: '#7a0033',
            },
          },
          label: {
            fontWeight: 600,
            textTransform: 'none',
          },
        }}
        style={{ marginTop: 'auto' }}
      >
        View Details
      </Button>
    </Box>
  )
}
