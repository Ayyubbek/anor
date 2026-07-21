import {
  Box,
  Button,
  Divider,
  Flex,
  Group,
  NumberInput,
  Paper,
  TextInput,
} from '@mantine/core'
import { useDebouncedValue } from '@mantine/hooks'
import { RiRefreshLine, RiSearchLine } from '@remixicon/react'
import { useEffect, useState } from 'react'
import { useCategories } from '../../hooks/useProducts'
import { useSearchRequestParams } from '../../hooks/useSearchRequestParams'
import { CreateProductButton } from './CreateProductButton'
import type { TProductParams } from '../../types/product'

const VISIBLE_CATEGORIES_COUNT = 8
const PRIMARY_COLOR = '#A30041'
const PRIMARY_HOVER = '#7a0033'
const categoryButtonStyles = (isActive = false) => ({
  root: {
    flexShrink: 0,
    height: 38,
    borderColor: isActive ? PRIMARY_COLOR : '#d9d9d9',
    backgroundColor: isActive ? PRIMARY_COLOR : '#fff',
    color: isActive ? '#fff' : '#000',
    transition:
      'background-color 150ms ease, color 150ms ease, border-color 150ms ease, transform 150ms ease',
    '&:hover': {
      backgroundColor: isActive ? PRIMARY_HOVER : '#f5f5f5',
    },
  },
  label: {
    whiteSpace: 'nowrap',
    fontWeight: 600,
  },
})

export const ProductFilter = () => {
  const { searchParams, setSearchParams } =
    useSearchRequestParams<TProductParams>()

  const { data: categories } = useCategories()

  const activeCategory = searchParams.categoryId ?? ''

  const [searchValue, setSearchValue] = useState(searchParams.search ?? '')
  const [minPrice, setMinPrice] = useState(searchParams.price_min ?? '')
  const [maxPrice, setMaxPrice] = useState(searchParams.price_max ?? '')
  const [isCategoriesExpanded, setIsCategoriesExpanded] = useState(false)
  const [debouncedSearch] = useDebouncedValue(searchValue, 400)
  const [debouncedMinPrice] = useDebouncedValue(minPrice, 400)
  const [debouncedMaxPrice] = useDebouncedValue(maxPrice, 400)

  const availableCategories =
    categories?.filter((category) => category.name !== 'New Category') ?? []
  const selectedCategory = availableCategories.find(
    (category) => String(category.id) === activeCategory
  )
  const firstCategories = availableCategories.slice(0, VISIBLE_CATEGORIES_COUNT)
  const visibleCategories = isCategoriesExpanded
    ? availableCategories
    : selectedCategory &&
        !firstCategories.some((category) => category.id === selectedCategory.id)
      ? [...firstCategories, selectedCategory]
      : firstCategories
  const hasHiddenCategories =
    availableCategories.length > VISIBLE_CATEGORIES_COUNT

  useEffect(() => {
    setSearchParams({ key: 'search', value: debouncedSearch })
  }, [debouncedSearch, setSearchParams])

  useEffect(() => {
    setSearchParams({ key: 'price_min', value: debouncedMinPrice })
  }, [debouncedMinPrice, setSearchParams])

  useEffect(() => {
    setSearchParams({ key: 'price_max', value: debouncedMaxPrice })
  }, [debouncedMaxPrice, setSearchParams])

  const onCategoryClick = (categoryId: string) => {
    setSearchParams({ key: 'categoryId', value: categoryId })
  }

  const onResetFilters = () => {
    setSearchValue('')
    setMinPrice('')
    setMaxPrice('')
    setSearchParams({ key: 'categoryId', value: '' })
    setSearchParams({ key: 'search', value: '' })
    setSearchParams({ key: 'price_min', value: '' })
    setSearchParams({ key: 'price_max', value: '' })
  }

  return (
    <Paper shadow="sm" radius="md" p="xl" maw={1100} mx="auto">
      <Group justify="flex-end" mb="md" style={{ width: '100%' }}>
        <CreateProductButton />
      </Group>

      <Box w="100%">
        <Group justify="center" gap="sm" mb="md" style={{ rowGap: 12 }}>
          <Button
            radius="xl"
            variant={activeCategory === '' ? 'filled' : 'default'}
            color="red"
            onClick={() => onCategoryClick('')}
            styles={categoryButtonStyles(activeCategory === '')}
          >
            Все
          </Button>

          {visibleCategories.map((category) => (
            <Button
              key={category.id}
              radius="xl"
              variant={
                activeCategory === String(category.id) ? 'filled' : 'default'
              }
              color="red"
              onClick={() => onCategoryClick(String(category.id))}
              styles={categoryButtonStyles(
                activeCategory === String(category.id)
              )}
            >
              {category.name}
            </Button>
          ))}

          {hasHiddenCategories && (
            <Button
              radius="xl"
              variant="default"
              onClick={() => setIsCategoriesExpanded((value) => !value)}
              styles={categoryButtonStyles(false)}
            >
              {isCategoriesExpanded ? 'Show Less' : 'Show More'}
            </Button>
          )}
        </Group>

        <Divider my="md" />

        <Box>
          <Flex gap="md" align="flex-end" wrap={{ base: 'wrap', md: 'nowrap' }}>
            <Box flex={2}>
              <TextInput
                size="md"
                radius="xl"
                placeholder="Поиск по названию"
                leftSection={<RiSearchLine size={16} />}
                value={searchValue}
                onChange={(event) => setSearchValue(event.currentTarget.value)}
                styles={{
                  input: {
                    minHeight: 44,
                  },
                }}
              />
            </Box>

            <Box flex={1}>
              <NumberInput
                size="md"
                radius="xl"
                placeholder="Minimum Price"
                min={0}
                value={minPrice}
                onChange={(value) => setMinPrice(String(value ?? ''))}
                styles={{
                  input: {
                    minHeight: 44,
                  },
                }}
              />
            </Box>

            <Box flex={1}>
              <NumberInput
                size="md"
                radius="xl"
                placeholder="Maximum Price"
                min={0}
                value={maxPrice}
                onChange={(value) => setMaxPrice(String(value ?? ''))}
                styles={{
                  input: {
                    minHeight: 44,
                  },
                }}
              />
            </Box>

            <Button
              size="md"
              radius="xl"
              variant="outline"
              color="red"
              leftSection={<RiRefreshLine size={16} />}
              onClick={onResetFilters}
              styles={{
                root: {
                  borderColor: PRIMARY_COLOR,
                  color: PRIMARY_COLOR,
                  minWidth: 170,
                  height: 44,
                  transition:
                    'background-color 150ms ease, border-color 150ms ease, color 150ms ease',
                  '&:hover': {
                    backgroundColor: 'rgba(163,0,65,.06)',
                  },
                },
                label: {
                  fontWeight: 600,
                },
              }}
            >
              Сбросить
            </Button>
          </Flex>
        </Box>
      </Box>
    </Paper>
  )
}
