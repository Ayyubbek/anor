import { Box, Button, Group, NumberInput, TextInput } from '@mantine/core'
import { useDebouncedValue } from '@mantine/hooks'
import { RiRefreshLine, RiSearchLine } from '@remixicon/react'
import { useEffect, useState } from 'react'
import { useCategories } from '../../hooks/useProducts'
import { useSearchRequestParams } from '../../hooks/useSearchRequestParams'
import type { TProductParams } from '../../types/product'

const VISIBLE_CATEGORIES_COUNT = 8
const categoryButtonStyles = {
  root: {
    flexShrink: 0,
    height: 38,
    maxWidth: 160,
  },
  label: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
}
const controlWidth = { base: '100%', sm: 180 }

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
    (category) => String(category.id) === activeCategory,
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
  }, [debouncedSearch])

  useEffect(() => {
    setSearchParams({ key: 'price_min', value: debouncedMinPrice })
  }, [debouncedMinPrice])

  useEffect(() => {
    setSearchParams({ key: 'price_max', value: debouncedMaxPrice })
  }, [debouncedMaxPrice])

  useEffect(() => {
    setSearchValue(searchParams.search ?? '')
  }, [searchParams.search])

  useEffect(() => {
    setMinPrice(searchParams.price_min ?? '')
  }, [searchParams.price_min])

  useEffect(() => {
    setMaxPrice(searchParams.price_max ?? '')
  }, [searchParams.price_max])

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
    <Box w="100%">
      <Group justify="center" gap="sm" mb="xl" style={{ rowGap: 12 }}>
        <Button
          radius="xl"
          variant={activeCategory === '' ? 'filled' : 'default'}
          onClick={() => onCategoryClick('')}
          styles={categoryButtonStyles}
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
            onClick={() => onCategoryClick(String(category.id))}
            styles={categoryButtonStyles}
          >
            {category.name}
          </Button>
        ))}

        {hasHiddenCategories && (
          <Button
            radius="xl"
            variant="subtle"
            color="red"
            onClick={() => setIsCategoriesExpanded((value) => !value)}
            styles={{ root: { height: 38, flexShrink: 0 } }}
          >
            {isCategoriesExpanded ? 'Show Less' : 'Show More'}
          </Button>
        )}
      </Group>

      <Box maw={760} mx="auto">
        <TextInput
          w="100%"
          radius="xl"
          mb="md"
          placeholder="Поиск по названию"
          leftSection={<RiSearchLine size={16} />}
          value={searchValue}
          onChange={(event) => setSearchValue(event.currentTarget.value)}
        />

        <Group justify="center" align="end" gap="md" style={{ rowGap: 16 }}>
          <NumberInput
            w={controlWidth}
            radius="xl"
            label="Minimum Price"
            placeholder="Minimum Price"
            min={0}
            value={minPrice}
            onChange={(value) => setMinPrice(value.toString())}
          />

          <NumberInput
            w={controlWidth}
            radius="xl"
            label="Maximum Price"
            placeholder="Maximum Price"
            min={0}
            value={maxPrice}
            onChange={(value) => setMaxPrice(value.toString())}
          />

          <Button
            radius="xl"
            variant="outline"
            color="red"
            leftSection={<RiRefreshLine size={16} />}
            onClick={onResetFilters}
            w={controlWidth}
          >
            Сбросить
          </Button>
        </Group>
      </Box>
    </Box>
  )
}
