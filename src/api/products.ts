import type {
  ICategory,
  IProduct,
  IProductForm,
  TProductParams,
} from '../types/product'
import { $api } from './api'

const baseURL = '/products'

export const productsApi = {
  get: (params?: TProductParams) => $api.get<IProduct[]>(baseURL, { params }),

  getById: (id: IProduct['id']) => $api.get<IProduct>(`${baseURL}/${id}`),

  // POST /products — создать
  create: (data: IProductForm) => $api.post<IProduct>(baseURL, data),

  // PUT /products/:id — изменить целиком (частичный payload допустим)
  update: (id: IProduct['id'], data: Partial<IProductForm>) =>
    $api.put<IProduct>(`${baseURL}/${id}`, data),

  // DELETE /products/:id — удалить
  delete: (id: IProduct['id']) => $api.delete<boolean>(`${baseURL}/${id}`),
}

export const categoriesApi = {
  get: () => $api.get<ICategory[]>('/categories'),
}
