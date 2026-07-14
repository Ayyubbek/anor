import { Box, Container, Flex, Text, Title } from '@mantine/core'
import bannerImg from '../../assets/images/FactsInNumbersBanner.png'
import carsIcon from '../../assets/icons/cars.svg'
import customersIcon from '../../assets/icons/customers.svg'
import yearsIcon from '../../assets/icons/years.svg'
import milesIcon from '../../assets/icons/miles.svg'

const stats = [
  { icon: carsIcon, value: '540+', label: 'Cars' },
  { icon: customersIcon, value: '20k+', label: 'Customers' },
  { icon: yearsIcon, value: '25+', label: 'Years' },
  { icon: milesIcon, value: '20m+', label: 'Miles' },
]

export const Statistics = () => {
  return (
    <Box component="section" style={{ padding: '80px 0', overflow: 'hidden' }}>
      <Container size="lg">
        <Box
          style={{
            position: 'relative',
            overflow: 'hidden',
            borderRadius: 20,
            backgroundImage: `url(${bannerImg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            padding: '80px 40px',
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
            <Box
              style={{
                maxWidth: 760,
                margin: '0 auto 48px',
                textAlign: 'center',
                color: '#fff',
              }}
            >
              <Title
                order={2}
                style={{
                  fontSize: 42,
                  marginBottom: 16,
                  letterSpacing: '-0.05em',
                }}
              >
                Facts In Numbers
              </Title>
              <Text style={{ fontSize: 16, lineHeight: 1.8, opacity: 0.9 }}>
                Amet cras hac orci lacus. Faucibus ipsum arcu lectus nibh sapien
                bibendum ullamcorper in. Diam tincidunt tincidunt erat at semper
                fermentum.
              </Text>
            </Box>

            <Flex wrap="nowrap" gap={24} justify="space-between">
              {stats.map((item) => (
                <Box
                  key={item.label}
                  style={{
                    flex: '1 1 0',
                    minWidth: 0,
                    maxWidth: 'calc(25% - 18px)',
                    background: '#fff',
                    borderRadius: 24,
                    padding: '24px 20px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 18,
                    boxShadow: '0 24px 60px rgba(0, 0, 0, 0.12)',
                  }}
                >
                  <Box
                    style={{
                      width: 64,
                      height: 64,
                      borderRadius: 12,
                      display: 'grid',
                      placeItems: 'center',
                      flexShrink: 0,
                    }}
                  >
                    <img
                      src={item.icon}
                      alt={item.label}
                      style={{ width: '100%', height: '100%' }}
                    />
                  </Box>

                  <Box>
                    <Text fw={700} style={{ fontSize: 24, marginBottom: 6 }}>
                      {item.value}
                    </Text>
                    <Text style={{ fontSize: 16, color: '#666' }}>
                      {item.label}
                    </Text>
                  </Box>
                </Box>
              ))}
            </Flex>
          </Box>
        </Box>
      </Container>
    </Box>
  )
}
