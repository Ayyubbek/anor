import { Box, Flex, Text, Container } from '@mantine/core'
import { menuLinks } from '../../constants/menuLinks.ts'
import { Link } from 'react-router'
import logo from '../../assets/logos/logo.svg'
import { RiPhoneFill } from '@remixicon/react'

export const Navbar = () => {
  return (
    <Container size="lg">
      <Flex
        justify="space-between"
        align="center"
        wrap="wrap"
        style={{ gap: 24, paddingTop: 16, paddingBottom: 16 }}
      >
        <Link
          to="/"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            textDecoration: 'none',
            color: 'inherit',
            cursor: 'pointer',
          }}
        >
          <img
            src={logo}
            alt="Car Rental logo"
            style={{ width: 36, height: 36 }}
          />
          <Text fw={700} style={{ cursor: 'pointer', margin: 0 }}>
            Car Rental
          </Text>
        </Link>

        <Flex
          gap={32}
          wrap="wrap"
          justify="center"
          style={{ flex: 1, minWidth: 240 }}
        >
          {menuLinks.map((item) => (
            <Link
              key={item.title}
              to={item.path}
              style={{
                textDecoration: 'none',
                color: '#111',
                fontWeight: 500,
                fontSize: 15,
                cursor: 'pointer',
              }}
            >
              {item.title}
            </Link>
          ))}
        </Flex>

        <Box
          component="a"
          href="tel:+9962471680"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            textDecoration: 'none',
          }}
        >
          <Box
            style={{
              width: 40,
              height: 40,
              minWidth: 40,
              borderRadius: 999,
              background: '#8b1538',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <RiPhoneFill size={20} color="#fff" />
          </Box>

          <Box
            style={{
              display: 'flex',
              flexDirection: 'column',
              lineHeight: 1.1,
            }}
          >
            <Text
              size="xs"
              color="dimmed"
              style={{ color: '#000000', margin: 0 }}
            >
              Need help?
            </Text>
            <Text
              fw={700}
              style={{ color: '#000000', fontSize: 16, margin: 0 }}
            >
              +996 247-1680
            </Text>
          </Box>
        </Box>
      </Flex>
    </Container>
  )
}
