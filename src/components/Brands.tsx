import { Box, Container, Flex } from '@mantine/core'
import audi from '../assets/logos/AudiLogo.svg'
import bmw from '../assets/logos/bmwLogo.svg'
import jeep from '../assets/logos/jeepLogo.svg'
import ford from '../assets/logos/FordLogo.svg'
import mers from '../assets/logos/mersLogo.svg'
import toyota from '../assets/logos/toyotaLogo.svg'

export const Brands = () => {
  const logos = [toyota, ford, mers, jeep, bmw, audi]

  return (
    <Container size="lg">
      <Box
        style={{
          background: '#fafafa',
          borderRadius: 16,
          padding: '18px 0',
          margin: '24px 0',
        }}
      >
        <Flex align="center" justify="space-between" style={{ gap: 100 }}>
          {logos.map((src, i) => (
            <Box key={i} style={{ flex: '0 0 auto', padding: '8px 12px' }}>
              <img
                src={src}
                alt={`brand-${i}`}
                style={{ width: 72, height: 'auto', display: 'block' }}
              />
            </Box>
          ))}
        </Flex>
      </Box>
    </Container>
  )
}

export default Brands
