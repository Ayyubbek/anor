import { Box, Container, Title, Flex } from '@mantine/core'
import { ProductCard } from '../ProductCard'

const carSamples = [
  { title: 'Mercedes', category: 'Sedan', price: '$25' },
  { title: 'Mercedes', category: 'Sport', price: '$50' },
  { title: 'Mercedes', category: 'Sedan', price: '$45' },
  { title: 'Porsche', category: 'SUV', price: '$40' },
  { title: 'Toyota', category: 'Sedan', price: '$35' },
  { title: 'Porsche', category: 'SUV', price: '$50' },
]

export const ProductsSection = () => {
  return (
    <Box style={{ padding: '64px 0', background: '#fff' }}>
      <Container size="lg">
        <Flex
          justify="space-between"
          align="center"
          style={{ marginBottom: 32 }}
        >
          <Title
            order={2}
            style={{
              fontSize: 50,
              fontWeight: 700,
              color: '#000',
              margin: 0,
              width: '50%',
            }}
          >
            Choose the car that suits you
          </Title>
          <Box
            style={{
              cursor: 'pointer',
              color: '#000',
              fontSize: 20,
              fontWeight: 500,
              display: 'flex',
              alignItems: 'center',
              gap: 8,
            }}
          >
            <span>View All</span>
            <span>→</span>
          </Box>
        </Flex>

        <Box
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 24,
          }}
        >
          {carSamples.map((car) => (
            <Box key={car.title + car.price}>
              <ProductCard
                title={car.title}
                category={car.category}
                price={car.price}
              />
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  )
}
