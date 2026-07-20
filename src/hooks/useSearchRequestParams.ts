import { useSearchParams } from 'react-router'

interface QueryParam<T> {
  key: keyof T
  value: string | number | undefined | null
}

interface Options<T> {
  defaultParams?: Partial<T>
}

export function useSearchRequestParams<T>(options?: Options<T>) {
  const [searchParams, setSearchParams] = useSearchParams()

  const getParams = () =>
    Object.fromEntries(searchParams.entries()) as unknown as T

  const getDefaultSearchParams = () => {
    if (options?.defaultParams) {
      Object.entries(options.defaultParams).forEach(([key, value]) => {
        if (!searchParams.has(key)) {
          searchParams.set(key, String(value))
        }
      })
    }

    return getParams()
  }

  const handleSetSearchParams = ({ key, value }: QueryParam<T>) => {
    if (searchParams.get('page')) searchParams.set('page', '1')

    const stringValue = value?.toString() ?? ''

    if (stringValue !== '') {
      searchParams.set(key.toString(), stringValue)
    } else {
      searchParams.delete(key.toString())
    }

    setSearchParams(searchParams)
  }

  return {
    searchParams: getParams(),
    getDefaultSearchParams,
    setSearchParams: handleSetSearchParams,
  }
}
