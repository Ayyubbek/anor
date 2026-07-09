import { Box, Button, Flex, Text } from '@mantine/core'

export const ProductCard = () => {
  return (
    <Box w={'20%'} bg={'#d5d3d3'} p={'md'}>
      <Box w={'100%'} h={'200px'} bg={'gray'}></Box>
      <Flex justify={'space-between'} align={'center'}>
        <Text>Product name</Text>

        <Text>15.000 uzs</Text>
      </Flex>

      <Button w={'100%'}>View details</Button>
    </Box>
  )
}
