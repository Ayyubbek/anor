import { Box, Container, Flex, Text, Title } from '@mantine/core'
import iphoneImage from '../../assets/images/IphoneMaket.png'
import appStoreIcon from '../../assets/icons/AppStore.svg'
import googlePlayIcon from '../../assets/icons/GooglePlay.svg'

export const DownloadSection = () => {
  return (
    <Box component="section" style={{ padding: '80px 0', background: '#fff' }}>
      <Container size="lg">
        <Flex align="center" justify="space-between" wrap="wrap" gap={40}>
          <Box style={{ flex: '1 1 420px', minWidth: 320, maxWidth: 540 }}>
            <Title
              order={2}
              style={{
                fontSize: 50,
                marginBottom: 24,
                lineHeight: 1.05,
                maxWidth: 315,
              }}
            >
              Download mobile app
            </Title>
            <Text
              style={{
                fontSize: 16,
                lineHeight: 1.8,
                marginBottom: 32,
                color: '#4f4f4f',
              }}
            >
              Imperdiet ut tristique viverra nunc. Ultrices orci vel auctor
              cursus turpis nibh placerat massa. Fermentum urna ut at et in.
              Turpis aliquet cras hendrerit enim condimentum. Condimentum
              interdum risus bibendum urna.
            </Text>
            <Flex gap={20} wrap="wrap">
              <Box
                component="a"
                href="#"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  textDecoration: 'none',
                }}
              >
                <img
                  src={appStoreIcon}
                  alt="App Store"
                  style={{ width: 160, height: 'auto' }}
                />
              </Box>
              <Box
                component="a"
                href="#"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  textDecoration: 'none',
                }}
              >
                <img
                  src={googlePlayIcon}
                  alt="Google Play"
                  style={{ width: 160, height: 'auto' }}
                />
              </Box>
            </Flex>
          </Box>

          <Box
            style={{
              flex: '1 1 360px',
              minWidth: 320,
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <img
              src={iphoneImage}
              alt="iPhone mockup"
              style={{
                width: '100%',
                maxWidth: 435,
                borderRadius: 32,
                objectFit: 'cover',
              }}
            />
          </Box>
        </Flex>
      </Container>
    </Box>
  )
}
