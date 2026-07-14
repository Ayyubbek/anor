import { Box, Button, Container, Flex, Stack, Text, Title } from '@mantine/core'
import { useLocation } from 'react-router'
import { Navbar } from '../components/home/Navbar'
import { ProductsSection } from '../components/home/ProductsSection'
import carImg from '../assets/icons/carIcon.svg'
import automatIcon from '../assets/icons/automat.svg'
import pbIcon from '../assets/icons/pb.svg'
import airCIcon from '../assets/icons/airC.svg'
import imgDetail from '../assets/images/ImgDetail.jpg'
import { Footer } from '../components/home/Footer'

type DetailsState = {
  title: string
  category: string
  price: string
  specs: {
    gearBox: string
    fuel: string
    doors: number
    airConditioner: string
    seats: number
    distance: number
  }
  equipment: string[]
}

export function DetailsPage() {
  const location = useLocation()
  const state = location.state as DetailsState | null

  const details: DetailsState = state ?? {
    title: 'BMW',
    category: 'SUV',
    price: '$25',
    specs: {
      gearBox: 'Automat',
      fuel: 'Petrol',
      doors: 2,
      airConditioner: 'Yes',
      seats: 5,
      distance: 500,
    },
    equipment: ['ABS', 'Air Bags', 'Cruise Control', 'Air Conditioner'],
  }

  return (
    <>
      <Navbar />
      <Container size="lg" style={{ paddingTop: 40, paddingBottom: 40 }}>
        <Flex justify="space-between" align="stretch" wrap="wrap" gap={40}>
          <Box
            style={{
              flex: '1 1 540px',
              minWidth: 320,
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <Text size="sm" color="dimmed" style={{ marginBottom: 12 }}>
              {details.title}
            </Text>
            <Title order={2} style={{ margin: 0, marginBottom: 16 }}>
              {details.title}
            </Title>
            <Text
              style={{
                color: '#A30041',
                fontSize: 28,
                fontWeight: 700,
                marginBottom: 16,
              }}
            >
              {details.price}{' '}
              <Text
                component="span"
                size="sm"
                style={{ color: '#999', fontWeight: 500 }}
              >
                / day
              </Text>
            </Text>

            <Box
              style={{
                width: '630px',
                borderRadius: 20,
                overflow: 'hidden',
                background: '#fafafa',
                padding: 32,
                marginBottom: 24,
              }}
            >
              <img
                src={carImg}
                alt="car"
                style={{
                  width: '100%',
                  height: 300,
                  objectFit: 'contain',
                  display: 'block',
                }}
              />
            </Box>

            <Flex gap={12} wrap="wrap">
              {[1, 2, 3].map((item) => (
                <Box
                  key={item}
                  style={{
                    flex: '0 1 calc(33.333% - 65px)',
                    cursor: 'pointer',
                    height: 100,
                    borderRadius: 16,
                    overflow: 'hidden',
                  }}
                >
                  <img
                    src={imgDetail}
                    alt={`car-detail-${item}`}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      display: 'block',
                    }}
                  />
                </Box>
              ))}
            </Flex>
          </Box>

          <Stack
            spacing={24}
            style={{ flex: '1 1 360px', minWidth: 320, display: 'flex' }}
          >
            <Box style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
              <Title order={3} style={{ marginBottom: 24, fontSize: 18 }}>
                Technical Specification
              </Title>
              <Box
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(3, 1fr)',
                  gap: 16,
                  flex: 1,
                }}
              >
                <SpecCard
                  label="Gear Box"
                  value={details.specs.gearBox}
                  icon={automatIcon}
                />
                <SpecCard
                  label="Fuel"
                  value={details.specs.fuel}
                  icon={pbIcon}
                />
                <SpecCard
                  label="Doors"
                  value={details.specs.doors.toString()}
                  icon={carImg}
                />
                <SpecCard
                  label="Air Conditioner"
                  value={details.specs.airConditioner}
                  icon={airCIcon}
                />
                <SpecCard
                  label="Seats"
                  value={details.specs.seats.toString()}
                  icon={carImg}
                />
                <SpecCard
                  label="Distance"
                  value={`${details.specs.distance}`}
                  icon={carImg}
                />
              </Box>
            </Box>

            <Button fullWidth style={{ background: '#A30041', marginTop: 16 }}>
              Rent a car
            </Button>

            <Box>
              <Text
                size="sm"
                color="#111"
                style={{ marginBottom: 14, fontWeight: 700 }}
              >
                Car Equipment
              </Text>
              <Flex wrap="wrap" gap={12}>
                {details.equipment.map((item) => (
                  <Box
                    key={item}
                    style={{
                      flex: '0 1 48%',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 12,
                    }}
                  >
                    <Box
                      style={{
                        width: 24,
                        height: 24,
                        borderRadius: 999,
                        background: '#A30041',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <svg
                        width="14"
                        height="10"
                        viewBox="0 0 14 10"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M1 5L5 9L13 1"
                          stroke="#ffffff"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </Box>
                    <Text size="sm" style={{ margin: 0 }}>
                      {item}
                    </Text>
                  </Box>
                ))}
              </Flex>
            </Box>
          </Stack>
        </Flex>
      </Container>
      <ProductsSection title="Other cars" />
      <Footer />
    </>
  )
}

function SpecCard({
  label,
  value,
  icon,
}: {
  label: string
  value: string
  icon: string
}) {
  return (
    <Box style={{ textAlign: 'center', padding: '16px 12px' }}>
      <Box
        style={{
          width: 40,
          height: 40,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 12px',
        }}
      >
        <img src={icon} alt={label} style={{ width: 24, height: 24 }} />
      </Box>
      <Text fw={700} style={{ margin: 0, marginBottom: 4, fontSize: 14 }}>
        {label}
      </Text>
      <Text size="sm" color="#999" style={{ margin: 0 }}>
        {value}
      </Text>
    </Box>
  )
}
