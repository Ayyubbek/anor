import { Box, Button, Container, Flex, Text, Title } from '@mantine/core'
import bannerImg from '../../assets/images/BannerCar.png'

export const SearchBanner = () => {
  return (
    <Box component="section" style={{ padding: '48px 0', overflow: 'hidden' }}>
      <Container size="lg">
        <Box
          style={{
            position: 'relative',
            overflow: 'hidden',
            borderRadius: 20,
            backgroundImage: `url(${bannerImg})`,
            backgroundSize: 'contain',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            padding: '56px 50px',
            minHeight: 280,
          }}
        >
          <Box
            style={{
              position: 'absolute',
              inset: 0,
              zIndex: 1,
            }}
          />

          <Box style={{ position: 'relative', zIndex: 2 }}>
            <Flex align="center" justify="space-between" wrap="wrap" gap={24}>
              <Box style={{ flex: '1 1 520px', minWidth: 280, color: '#fff' }}>
                <Title order={2} style={{ fontSize: 50, marginBottom: 16 }}>
                  Enjoy every mile with
                  <br />
                  adorable companionship.
                </Title>
                <Text style={{ fontSize: 16, opacity: 0.95, marginBottom: 28 }}>
                  Amet cras hac orci lacus. Faucibus ipsum arcu lectus nibh
                  sapien bibendum ullamcorper in. Diam tincidunt tincidunt erat
                </Text>

                <Box
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 12,
                    maxWidth: 460,
                  }}
                >
                  <Box
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      width: '100%',
                      background: '#fff',
                      borderRadius: 20,
                      padding: 4,
                      boxSizing: 'border-box',
                      gap: 12,
                    }}
                  >
                    <Box
                      component="input"
                      placeholder="City"
                      style={{
                        flex: 1,
                        padding: '10px 14px',
                        borderRadius: 20,
                        border: 'none',
                        outline: 'none',
                        fontSize: 16,
                        background: 'transparent',
                      }}
                    />
                    <Button
                      style={{
                        background: '#FF9E0C',
                        color: '#fff',
                        borderRadius: 20,
                        padding: '8px 16px',
                        minWidth: 110,
                      }}
                    >
                      Search
                    </Button>
                  </Box>
                </Box>
              </Box>

              <Box
                style={{
                  flex: '0 0 360px',
                  minWidth: 280,
                  display: 'flex',
                  justifyContent: 'center',
                }}
              >
                <Box style={{ width: 320, height: 180 }} />
              </Box>
            </Flex>
          </Box>
        </Box>
      </Container>
    </Box>
  )
}
