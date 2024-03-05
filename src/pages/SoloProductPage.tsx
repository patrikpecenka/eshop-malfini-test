import { useQuery } from "@tanstack/react-query"
import { SoloProduct } from "components/SoloProduct"
import { ProductDto } from "lib/dto/types"
import fetcher from "lib/fetcher"
import { useNavigate, useParams } from "react-router-dom"

export const SoloProductPage = () => {
  const navigate = useNavigate()
  const { id } = useParams()

  const { data, status } = useQuery({
    queryKey: ['products', id],
    queryFn: () => fetcher<ProductDto>(`https://fakestoreapi.com/products/${id}`),
    enabled: !!id
  })

  if (status === 'pending') return <p>Loading...</p>
  if (status === 'error') return navigate("/products")

  return (
    <>
      <SoloProduct product={data} />
    </>
  )
}