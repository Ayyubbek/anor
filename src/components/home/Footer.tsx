import { Box, Container, Flex, Text, Title } from '@mantine/core'
import logo from '../../assets/logos/logo.svg'
import addressIcon from '../../assets/icons/adresY.svg'
import emailIcon from '../../assets/icons/emailY.svg'
import phoneIcon from '../../assets/icons/phoneY.svg'
import appStoreIcon from '../../assets/icons/AppStore.svg'
import googlePlayIcon from '../../assets/icons/GooglePlay.svg'
import facebookIcon from '../../assets/icons/facebook.svg'
import instagramIcon from '../../assets/icons/instagram.svg'
import twitterIcon from '../../assets/icons/twitter.svg'
import youtubeIcon from '../../assets/icons/youtube.svg'

export const Footer = () => {
  return (
    <Box
      component="footer"
      style={{ background: '#fff', padding: '56px 0 32px' }}
    >
      <Container size="lg">
        {/* Top section: Logo and Contact Info */}
        <Flex align="center" gap={163} wrap="wrap" style={{ marginBottom: 40 }}>
          {/* Logo and Title */}
          <Flex align="center" gap={12} style={{ flex: '0 0 auto' }}>
            <img src={logo} alt="logo" style={{ width: 40, height: 40 }} />
            <Title order={4} style={{ margin: 0, fontSize: 20 }}>
              Car Rental
            </Title>
          </Flex>

          {/* Contact info horizontal */}
          <Flex gap={50} align="flex-start">
            <Flex align="flex-start" gap={12}>
              <img
                src={addressIcon}
                alt="address"
                style={{ width: 32, height: 32, flexShrink: 0 }}
              />
              <Box>
                <Text
                  size="sm"
                  style={{ margin: 0, color: '#999', fontSize: 13 }}
                >
                  Address
                </Text>
                <Text fw={700} style={{ margin: 0 }}>
                  Oxford Ave. Cary, NC 27511
                </Text>
              </Box>
            </Flex>

            <Flex align="flex-start" gap={12}>
              <img
                src={emailIcon}
                alt="email"
                style={{ width: 32, height: 32, flexShrink: 0 }}
              />
              <Box>
                <Text
                  size="sm"
                  style={{ margin: 0, color: '#999', fontSize: 13 }}
                >
                  Email
                </Text>
                <Text fw={700} style={{ margin: 0 }}>
                  nwiger@yahoo.com
                </Text>
              </Box>
            </Flex>

            <Flex align="flex-start" gap={12}>
              <img
                src={phoneIcon}
                alt="phone"
                style={{ width: 32, height: 32, flexShrink: 0 }}
              />
              <Box>
                <Text
                  size="sm"
                  style={{ margin: 0, color: '#999', fontSize: 13 }}
                >
                  Phone
                </Text>
                <Text fw={700} style={{ margin: 0 }}>
                  +537 547-6401
                </Text>
              </Box>
            </Flex>
          </Flex>
        </Flex>

        {/* Main footer content grid */}
        <Flex
          wrap="wrap"
          gap={60}
          justify="space-between"
          style={{ marginBottom: 40 }}
        >
          {/* Left column: Description and Social */}
          <Box style={{ flex: '0 1 250px' }}>
            {/* Description and social */}
            <Text
              style={{
                marginBottom: 16,
                color: '#333',
                fontWeight: 500,
                fontSize: 14,
              }}
            >
              Faucibus faucibus pellentesque dictum turpis. Id pellentesque
              turpis massa a id iaculis lorem t...
            </Text>
            <Flex gap={14} align="center">
              <a href="#" style={{ display: 'inline-flex' }}>
                <img
                  src={facebookIcon}
                  alt="facebook"
                  style={{ width: 32, height: 32 }}
                />
              </a>
              <a href="#" style={{ display: 'inline-flex' }}>
                <img
                  src={instagramIcon}
                  alt="instagram"
                  style={{ width: 32, height: 32 }}
                />
              </a>
              <a href="#" style={{ display: 'inline-flex' }}>
                <img
                  src={twitterIcon}
                  alt="twitter"
                  style={{ width: 32, height: 32 }}
                />
              </a>
              <a href="#" style={{ display: 'inline-flex' }}>
                <img
                  src={youtubeIcon}
                  alt="youtube"
                  style={{ width: 32, height: 32 }}
                />
              </a>
            </Flex>
          </Box>

          {/* Useful links */}
          <Box style={{ flex: '0 1 160px' }}>
            <Title
              order={5}
              style={{ marginBottom: 20, fontSize: 18, fontWeight: 700 }}
            >
              Useful links
            </Title>
            <Flex direction="column" gap={12}>
              <a
                href="#"
                style={{ textDecoration: 'none', color: '#000', fontSize: 15 }}
              >
                About us
              </a>
              <a
                href="#"
                style={{ textDecoration: 'none', color: '#000', fontSize: 15 }}
              >
                Contact us
              </a>
              <a
                href="#"
                style={{ textDecoration: 'none', color: '#000', fontSize: 15 }}
              >
                Gallery
              </a>
              <a
                href="#"
                style={{ textDecoration: 'none', color: '#000', fontSize: 15 }}
              >
                Blog
              </a>
              <a
                href="#"
                style={{ textDecoration: 'none', color: '#000', fontSize: 15 }}
              >
                F.A.Q
              </a>
            </Flex>
          </Box>

          {/* Vehicles */}
          <Box style={{ flex: '0 1 160px' }}>
            <Title
              order={5}
              style={{ marginBottom: 20, fontSize: 18, fontWeight: 700 }}
            >
              Vehicles
            </Title>
            <Flex direction="column" gap={12}>
              <a
                href="#"
                style={{ textDecoration: 'none', color: '#000', fontSize: 15 }}
              >
                Sedan
              </a>
              <a
                href="#"
                style={{ textDecoration: 'none', color: '#000', fontSize: 15 }}
              >
                Cabriolet
              </a>
              <a
                href="#"
                style={{ textDecoration: 'none', color: '#000', fontSize: 15 }}
              >
                Pickup
              </a>
              <a
                href="#"
                style={{ textDecoration: 'none', color: '#000', fontSize: 15 }}
              >
                Minivan
              </a>
              <a
                href="#"
                style={{ textDecoration: 'none', color: '#000', fontSize: 15 }}
              >
                SUV
              </a>
            </Flex>
          </Box>

          {/* Download App */}
          <Box style={{ flex: '0 1 220px' }}>
            <Title
              order={5}
              style={{ marginBottom: 20, fontSize: 18, fontWeight: 700 }}
            >
              Download App
            </Title>
            <Flex direction="column" gap={12}>
              <a href="#" style={{ display: 'inline-block' }}>
                <img
                  src={appStoreIcon}
                  alt="App Store"
                  style={{ width: 180 }}
                />
              </a>
              <a href="#" style={{ display: 'inline-block' }}>
                <img
                  src={googlePlayIcon}
                  alt="Google Play"
                  style={{ width: 180 }}
                />
              </a>
            </Flex>
          </Box>
        </Flex>

        {/* Copyright */}
        <Box style={{ textAlign: 'center', color: '#ccc', fontSize: 14 }}>
          © Copyright Car Rental 2024. Design by Figma. guru
        </Box>
      </Container>
    </Box>
  )
}
