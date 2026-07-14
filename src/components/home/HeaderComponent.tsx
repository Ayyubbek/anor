import { Box } from '@mantine/core'
import { Navbar } from './Navbar'
import { HeaderHero } from './HeaderHero'

export const HeaderComponent = () => {
  return (
    <Box component="header">
      <Navbar />
      <HeaderHero />
    </Box>
  )
}
