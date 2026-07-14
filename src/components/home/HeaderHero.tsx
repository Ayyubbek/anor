import { Box, Button, Container, Flex, Paper, Text, Title } from '@mantine/core'
import calendarIcon from '../../assets/logos/calendar.png'

export const HeaderHero = () => {
  const fieldStyle = {
    width: '100%',
    padding: '14px 16px',
    borderRadius: 18,
    background: '#f5f5f5',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    color: '#2c2c2c',
  }

  return (
    <Box
      component="section"
      style={{ padding: '32px 0', background: '#f8f8f8' }}
    >
      <Container size="lg">
        <Box
          style={{
            background: '#A30041',
            borderRadius: 40,
            padding: 32,
            overflow: 'hidden',
            minHeight: 560,
          }}
        >
          <Flex wrap="wrap" align="center" justify="space-between" gap="24px">
            <Box
              style={{
                flex: '1 1 420px',
                minWidth: 320,
                maxWidth: 620,
                color: '#fff',
              }}
            >
              <Title
                order={1}
                style={{ fontSize: 60, lineHeight: 1.0, marginBottom: 24 }}
              >
                Experience the road like never before
              </Title>
              <Text
                size="md"
                style={{
                  maxWidth: 460,
                  marginBottom: 28,
                  opacity: 0.9,
                  fontSize: 16,
                }}
              >
                Aliquam adipiscing velit semper morbi. Purus non eu cursus
                porttitor tristique et gravida. Quis nunc interdum gravida
                ullamcorper.
              </Text>
              <Button
                style={{
                  backgroundColor: '#FF9E0C',
                  border: 'none',
                  color: '#fff',
                  borderRadius: 16,
                  padding: '12px 12px',
                  minWidth: 154,
                }}
                size="md"
              >
                View all cars
              </Button>
            </Box>

            <Paper
              radius={20}
              shadow="xl"
              style={{
                minWidth: 320,
                maxWidth: 400,
                width: '100%',
                padding: 24,
              }}
            >
              <Text
                fw={700}
                style={{ fontSize: 20, marginBottom: 20, textAlign: 'center' }}
              >
                Book your car
              </Text>
              <Box style={{ display: 'grid', gap: 14 }}>
                <Box style={fieldStyle}>
                  <Text>Car type</Text>
                  <Text>▾</Text>
                </Box>
                <Box style={fieldStyle}>
                  <Text>Place of rental</Text>
                  <Text>▾</Text>
                </Box>
                <Box style={fieldStyle}>
                  <Text>Place of return</Text>
                  <Text>▾</Text>
                </Box>
                <Box style={fieldStyle}>
                  <Text>Rental date</Text>
                  <Box style={{ width: 20, height: 20 }}>
                    <img
                      src={calendarIcon}
                      alt="calendar"
                      style={{ width: '100%', height: '100%' }}
                    />
                  </Box>
                </Box>
                <Box style={fieldStyle}>
                  <Text>Return date</Text>
                  <Box style={{ width: 20, height: 20 }}>
                    <img
                      src={calendarIcon}
                      alt="calendar"
                      style={{ width: '100%', height: '100%' }}
                    />
                  </Box>
                </Box>
              </Box>
              <Button
                style={{
                  marginTop: 22,
                  color: '#fff',
                  width: '100%',
                  backgroundColor: '#FF9E0C',
                  border: 'none',
                  borderRadius: 16,
                  padding: '12px 0',
                }}
                size="md"
              >
                Book now
              </Button>
            </Paper>
          </Flex>
        </Box>
      </Container>
    </Box>
  )
}
