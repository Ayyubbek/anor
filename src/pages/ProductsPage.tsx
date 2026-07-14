import { Stack, Title, Box, Container } from '@mantine/core'
import { useState } from 'react'
import './ProductsPage.css'
import { ProductCard } from '../components/ProductCard'
import { Navbar } from '../components/home/Navbar'
import Brands from '../components/Brands'
import { Footer } from '../components/home/Footer'

const sample = [
  { title: 'Mercedes', category: 'Sedan', price: '$25' },
  { title: 'Mercedes', category: 'Sport', price: '$50' },
  { title: 'Mercedes', category: 'Sedan', price: '$45' },
  { title: 'Porsche', category: 'SUV', price: '$40' },
  { title: 'Toyota', category: 'Sedan', price: '$35' },
  { title: 'Porsche', category: 'SUV', price: '$50' },
  { title: 'Mercedes', category: 'Van', price: '$50' },
  { title: 'Toyota', category: 'Sport', price: '$60' },
  { title: 'Maybach', category: 'Sedan', price: '$70' },
]

export function ProductsPage() {
  const [activeFilter, setActiveFilter] = useState('All vehicles')
  return (
    <>
      <Navbar />
      <Container size="lg">
        <Stack py={'lg'}>
          <Box style={{ textAlign: 'center' }}>
            <Title style={{ marginBottom: 18 }} order={2}>
              Select a vehicle group
            </Title>

            <div className="filter-row">
              {[
                'All vehicles',
                'Sedan',
                'Cabriolet',
                'Pickup',
                'Suv',
                'Minivan',
              ].map((f) => (
                <button
                  key={f}
                  className={`filter-pill ${f === activeFilter ? 'active' : ''}`}
                  onClick={() => setActiveFilter(f)}
                  type="button"
                >
                  {f}
                </button>
              ))}
            </div>
          </Box>

          <Box
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, minmax(220px, 1fr))',
              gap: 24,
            }}
          >
            {sample.map((p) => (
              <Box key={p.title + p.price}>
                <ProductCard
                  title={p.title}
                  category={p.category}
                  price={p.price}
                />
              </Box>
            ))}
          </Box>
          <Brands />
        </Stack>
      </Container>
      <Footer />
    </>
  )
}
