import { Box, Flex } from '@mantine/core'
import { menuLinks } from '../constants/menuLinks.ts'
import { Link } from 'react-router'

export const HeaderComponent = () => {
  return (
    <Box>
      <Flex justify={'space-between'} align={'center'} p={'lg'}>
        <h2>Anor shop</h2>

        {menuLinks.map((item) => (
          <Link to={item.path}>{item.title}</Link>
        ))}
      </Flex>
    </Box>
  )
}
