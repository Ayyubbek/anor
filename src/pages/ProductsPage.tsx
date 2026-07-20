import {
  Alert,
  Box,
  Center,
  Container,
  Loader,
  Pagination,
  SimpleGrid,
  Stack,
  Text,
  Title,
} from '@mantine/core'
import { ProductCard } from '../components/ProductCard'
import { Navbar } from '../components/home/Navbar'
import Brands from '../components/Brands'
import { Footer } from '../components/home/Footer'
import { ProductFilter } from '../components/products/ProductFilter'
import { useProducts } from '../hooks/useProducts'
import { useSearchRequestParams } from '../hooks/useSearchRequestParams'
import type { TProductParams } from '../types/product'

const PAGE_SIZE = 6

export function ProductsPage() {
  const { getDefaultSearchParams, setSearchParams } =
    useSearchRequestParams<TProductParams>({
      defaultParams: { page: '1', size: String(PAGE_SIZE) },
    })

  const params = getDefaultSearchParams()

  const { data, isLoading, isError, error } = useProducts(params)

  const products = data?.data ?? []
  const totalPages = Math.ceil((data?.total ?? 0) / PAGE_SIZE)

  return (
    <>
      <Navbar />

      <Container size="lg" py={48}>
        <Stack gap={40} align="center">
          <Box style={{ textAlign: 'center' }}>
            <Title style={{ marginBottom: 18 }} order={2}>
              Каталог
            </Title>
          </Box>

          <ProductFilter />

          {isLoading ? (
            <Center h={200}>
              <Loader color="orange" />
            </Center>
          ) : isError ? (
            <Alert color="red" title="Не удалось загрузить товары">
              {error.message}
            </Alert>
          ) : products.length === 0 ? (
            <Text c="dimmed">Ничего не найдено</Text>
          ) : (
            <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }} spacing="xl" w="100%">
              {products.map((product) => (
                <Box key={product.id}>
                  <ProductCard
                    id={product.id}
                    title={product.title}
                    category={product.category.name}
                    price={`$${product.price}`}
                    image={product.images?.[0]}
                  />
                </Box>
              ))}
            </SimpleGrid>
          )}

          {totalPages > 1 && (
            <Pagination
              radius="xl"
              total={totalPages}
              value={Number(params.page ?? 1)}
              onChange={(page) => setSearchParams({ key: 'page', value: page })}
            />
          )}

          <Brands />
        </Stack>
      </Container>

      <Footer />
    </>
  )
}
