import { ProductDto } from "../lib/dto/types"
import fetcher from "lib/fetcher"
import { useQuery } from '@tanstack/react-query'
import { useParams } from "react-router-dom"

export function useSoloProducts() {
  const { id } = useParams()

  return useQuery({
    queryKey: ['products', id],
    queryFn: () => fetcher<ProductDto>(`https://fakestoreapi.com/products/${id}`),
    enabled: !!id
  })
}

