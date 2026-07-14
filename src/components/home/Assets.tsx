import { Box, Container, Flex, Text } from '@mantine/core'
import AvailabilityIcon from '../../assets/logos/Availability.png'
import ComfortIcon from '../../assets/logos/Comfort.png'
import SavingsIcon from '../../assets/logos/Savings.png'

export const Assets = () => {
  const assets = [
    {
      icon: AvailabilityIcon,
      title: 'Availability',
      description:
        'Diam tincidunt tincidunt erat at semper fermentum. Id ultricies quis',
    },
    {
      icon: ComfortIcon,
      title: 'Comfort',
      description:
        'Gravida auctor fermentum morbi vulputate ac egestas orcietium convallis',
    },
    {
      icon: SavingsIcon,
      title: 'Savings',
      description:
        'Pretium convallis id diam sed commodo vestibulum lobortis volutpat',
    },
  ]

  return (
    <Box component="section" style={{ padding: '64px 0', background: '#fff' }}>
      <Container size="lg">
        <Flex gap="40px" justify="space-between" wrap="wrap">
          {assets.map((asset) => (
            <Box
              key={asset.title}
              style={{
                flex: '1 1 280px',
                minWidth: 280,
                textAlign: 'center',
              }}
            >
              <Box
                style={{
                  marginBottom: 24,
                  display: 'flex',
                  justifyContent: 'center',
                }}
              >
                <img
                  src={asset.icon}
                  alt={asset.title}
                  style={{
                    width: 64,
                    height: 64,
                    objectFit: 'contain',
                  }}
                />
              </Box>
              <Text fw={700} style={{ fontSize: 24, marginBottom: 12 }}>
                {asset.title}
              </Text>
              <Text style={{ fontSize: 16, color: '#000000', lineHeight: 1.5 }}>
                {asset.description}
              </Text>
            </Box>
          ))}
        </Flex>
      </Container>
    </Box>
  )
}
