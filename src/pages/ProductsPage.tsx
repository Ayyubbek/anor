import { Button, Flex, Stack, Title, Box } from '@mantine/core'
import { ProductCard } from '../components/ProductCard'

const sample = [
  { title: 'Mercedes', category: 'Sedan', price: '$25' },
  { title: 'Mercedes', category: 'Sport', price: '$50' },
  { title: 'Mercedes', category: 'Sedan', price: '$45' },
  { title: 'Porsche', category: 'SUV', price: '$40' },
  { title: 'Toyota', category: 'Sedan', price: '$35' },
  { title: 'Porsche', category: 'SUV', price: '$50' },
]

export function ProductsPage() {
  return (
    <Stack p={'xl'}>
      <Title>Select a vehicle group</Title>

      <Flex justify={'space-between'} align={'center'} w={'50%'}>
        <Button>All products</Button>
        <Button variant={'light'}>Clothes</Button>
        <Button variant={'light'}>Electronics</Button>
        <Button variant={'light'}>Furniture</Button>
        <Button variant={'light'}>Shoes</Button>
        <Button variant={'light'}>Miscellaneous</Button>
      </Flex>

      <Box
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
          gap: 24,
        }}
      >
        {sample.map((p) => (
          <Box key={p.title + p.price}>
            <ProductCard
              title={p.title}
              category={p.category}
              price={p.price}
            />
          </Box>
        ))}
      </Box>
    </Stack>
  )
}
