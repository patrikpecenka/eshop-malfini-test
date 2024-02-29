import { useParams } from "react-router-dom"
import fetcher from "lib/fetcher"
import { useQuery } from '@tanstack/react-query'
import { ProductDto } from "../lib/dto/types"
import { SoloProduct } from "components/SoloProduct"

export const SoloProductPage = () => {
  const { id } = useParams()

  const { status, data } = useQuery({
    queryKey: ['soloProduct'],
    queryFn: () => fetcher<ProductDto>(`https://fakestoreapi.com/products/${id}`)
  })

  if (status === 'pending') return <p>Loading...</p>
  if (status === 'error') return <p>Error</p>

  return (
    <>
      <SoloProduct {...data} />
    </>
  )
}