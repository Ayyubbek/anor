import { Stack, Title, Box, Container } from '@mantine/core'
import { useState } from 'react'
import './ProductsPage.css'
import { ProductCard } from '../components/ProductCard'
import { Navbar } from '../components/home/Navbar'
import Brands from '../components/Brands'
import { Footer } from '../components/home/Footer'
import { useProducts } from '../hooks/useProducts'

export function ProductsPage() {
  const [activeFilter, setActiveFilter] = useState('All vehicles')
  const { data, isLoading, isError } = useProducts()

  return (
    <>
      <Navbar />

      <Container size="lg">
        <Stack py="lg">
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
            {isLoading ? (
              <p>Loading...</p>
            ) : isError ? (
              <p>Error loading products</p>
            ) : (
              data?.map((p) => (
                <Box key={p.id}>
                  <ProductCard
                    title={p.title}
                    category={p.category.name}
                    price={`$${p.price}`}
                    image={p.images?.[0]}
                  />
                </Box>
              ))
            )}
          </Box>

          <Brands />
        </Stack>
      </Container>

      <Footer />
    </>
  )
}