import { useMutation, useQueryClient } from '@tanstack/react-query'
import { productsApi } from '../api/products'
import type { IProduct, IProductForm } from '../types/product'
import { PRODUCTS_KEY } from './useProducts'

export const useCreateProduct = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: IProductForm) =>
      productsApi.create(data).then((resp) => resp.data),
    onSuccess: (created: IProduct) => {
      queryClient.setQueryData<IProduct[]>([PRODUCTS_KEY], (oldData) =>
        oldData ? [created, ...oldData] : [created]
      )
    },
  })
}

export const useUpdateProduct = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<IProductForm> }) =>
      productsApi.update(id, data).then((resp) => resp.data),
    onSuccess: (updated: IProduct) => {
      queryClient.invalidateQueries({ queryKey: [PRODUCTS_KEY] })
      queryClient.setQueryData([PRODUCTS_KEY, String(updated.id)], updated)
    },
  })
}

export const useDeleteProduct = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: number) =>
      productsApi.delete(id).then((resp) => resp.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [PRODUCTS_KEY] })
    },
  })
}
