import { Box, Flex, Text } from '@mantine/core'
import { useNavigate } from 'react-router'
import carImg from '../assets/icons/carIcon.svg'
import automatIcon from '../assets/icons/automat.svg'
import pbIcon from '../assets/icons/pb.svg'
import airCIcon from '../assets/icons/airC.svg'

interface ProductCardProps {
  title?: string
  category?: string
  price?: string
}

export const ProductCard = ({
  title = 'Mercedes',
  category = 'Sedan',
  price = '$25',
}: ProductCardProps) => {
  const navigate = useNavigate()

  const handleViewDetails = () => {
    navigate('/details', {
      state: {
        title,
        category,
        price,
        specs: {
          gearBox: 'Automat',
          fuel: 'Petrol',
          doors: 2,
          airConditioner: 'Yes',
          seats: 5,
          distance: 500,
        },
        equipment: ['ABS', 'Air Bags', 'Cruise Control', 'Air Conditioner'],
      },
    })
  }

  return (
    <Box
      style={{
        width: '100%',
        background: '#fff',
        borderRadius: 20,
        padding: 20,
        boxShadow: '0 6px 18px rgba(15, 23, 42, 0.06)',
        boxSizing: 'border-box',
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
          src={carImg}
          alt="car"
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
        align="center"
        style={{ marginTop: 16, marginBottom: 16 }}
      >
        <Box>
          <Text fw={700} style={{ fontSize: 18 }}>
            {title}
          </Text>
          <Text size="sm" color="#666" style={{ fontSize: 14 }}>
            {category}
          </Text>
        </Box>

        <Box style={{ textAlign: 'right' }}>
          <Text fw={700} style={{ color: '#A30041', fontSize: 18 }}>
            {price}
          </Text>
          <Text size="xs" color="#999" style={{ fontSize: 12 }}>
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
          <Text size="xs" color="#666" style={{ fontSize: 14 }}>
            Automat
          </Text>
        </Flex>
        <Flex align="center" gap={6}>
          <img src={pbIcon} alt="pb" style={{ width: 18, height: 18 }} />
          <Text size="xs" color="#666" style={{ fontSize: 14 }}>
            PB 95
          </Text>
        </Flex>
        <Flex align="center" gap={6}>
          <img src={airCIcon} alt="air" style={{ width: 18, height: 18 }} />
          <Text size="xs" color="#666" style={{ fontSize: 14 }}>
            Air Conditioner
          </Text>
        </Flex>
      </Flex>

      <button
        type="button"
        onClick={handleViewDetails}
        style={{
          width: '100%',
          background: '#A30041',
          color: '#fff',
          borderRadius: 12,
          padding: '10px 0',
          fontSize: 16,
          fontWeight: 600,
          border: 'none',
          cursor: 'pointer',
          textTransform: 'none',
        }}
      >
        View Details
      </button>
    </Box>
  )
}
