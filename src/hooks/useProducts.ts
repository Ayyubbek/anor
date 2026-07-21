import { useQuery } from '@tanstack/react-query'
import { categoriesApi, productsApi } from '../api/products'
import type { TProductParams } from '../types/product'

export const PRODUCTS_KEY = 'products-key'
export const CATEGORIES_KEY = 'categories-key'

export const useProducts = (params?: TProductParams) => {
  const { page, size, ...filters } = params ?? {}

  const current = Number(page ?? 1)
  const limit = Number(size ?? 6)
  const start = (current - 1) * limit

  return useQuery({
    queryKey: [PRODUCTS_KEY, filters],

    queryFn: () => productsApi.get(filters).then((resp) => resp.data),

    select: (all) => ({
      data: all.slice(start, start + limit),
      total: all.length,
    }),
  })
}

export const useProductById = (id?: string) =>
  useQuery({
    queryKey: [PRODUCTS_KEY, id],
    queryFn: () => productsApi.getById(Number(id)).then((resp) => resp.data),
    enabled: Boolean(id),
  })

export const useCategories = () =>
  useQuery({
    queryKey: [CATEGORIES_KEY],
    queryFn: () => categoriesApi.get().then((resp) => resp.data),
    staleTime: Infinity,
  })
