export interface ICategory {
  id: number
  name: string
  slug: string
  image: string
}

export interface IProduct {
  id: number
  title: string
  slug: string
  price: number
  description: string
  category: ICategory
  images: string[]
}

export interface ICommonParams {
  page?: string
  size?: string
  search?: string
}

export type TProductParams = ICommonParams & {
  categoryId?: string
  price_min?: string
  price_max?: string
}
