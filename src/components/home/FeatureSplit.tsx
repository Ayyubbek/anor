import { Box, Container, Flex, Text } from '@mantine/core'
import heroImg from '../../assets/images/Img1.png'

export const FeatureSplit = () => {
  const items = [
    {
      title: 'Erat at semper',
      desc: 'Non amet fermentum est in enim at sit ullamcorper. Sit elementum rhoncus nullam feugiat. Risus sem fermentum',
    },
    {
      title: 'Urna nec vivamus risus duis arcu',
      desc: 'Aliquam adipiscing velit semper morbi. Purus non eu cursus porttitor tristique et gravida. Quis nunc interdum gravida ullamcorper',
    },
    {
      title: 'Lobortis euismod imperdiet tempus',
      desc: 'Viverra scelerisque mauris et nullam molestie et. Augue adipiscing praesent nisl cras nunc luctus viverra nisi',
    },
    {
      title: 'Cras nulla aliquet nam eleifend amet et',
      desc: 'Aliquam adipiscing velit semper morbi. Purus non eu cursus porttitor tristique et gravida. Quisque eleifend tincidunt vulputate libero',
    },
  ]

  return (
    <Box component="section" style={{ padding: '64px 0', background: '#fff' }}>
      <Container size="lg">
        <Flex gap={40} align="center" wrap="wrap">
          <Box style={{ flex: '0 0 44%', minWidth: 280 }}>
            <img
              src={heroImg}
              alt="feature"
              style={{
                width: '100%',
                height: '100%',
                borderRadius: 16,
                objectFit: 'cover',
              }}
            />
          </Box>

          <Box style={{ flex: '1 1 48%', minWidth: 300 }}>
            <Box>
              {items.map((it, idx) => (
                <Flex
                  key={it.title}
                  gap={20}
                  align="flex-start"
                  style={{ marginBottom: 20 }}
                >
                  <Box
                    style={{
                      width: '32px',
                      height: '32px',
                      minWidth: '32px',
                      minHeight: '32px',
                      borderRadius: '50%',
                      background: '#A30041',
                      color: '#fff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 700,
                      fontSize: 14,
                      lineHeight: '32px',
                      flexShrink: 0,
                      overflow: 'hidden',
                      boxSizing: 'border-box',
                    }}
                  >
                    {idx + 1}
                  </Box>

                  <Box>
                    <Text fw={700} style={{ marginBottom: 6 }}>
                      {it.title}
                    </Text>
                    <Text style={{ color: '#666' }}>{it.desc}</Text>
                  </Box>
                </Flex>
              ))}
            </Box>
          </Box>
        </Flex>
      </Container>
    </Box>
  )
}
