import { useQuery } from '@tanstack/react-query'
import { categoriesApi, productsApi } from '../api/products'

export const PRODUCTS_KEY = 'products-key'
export const CATEGORIES_KEY = 'categories-key'

export const useProducts = () =>
  useQuery({
    queryKey: [PRODUCTS_KEY],
    queryFn: () => productsApi.get().then((resp) => resp.data),
  })

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