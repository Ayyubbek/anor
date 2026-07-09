import { Button, Flex, Stack, Title } from '@mantine/core'
import { ProductCard } from '../components/ProductCard.tsx'

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

      <ProductCard />
    </Stack>
  )
}
