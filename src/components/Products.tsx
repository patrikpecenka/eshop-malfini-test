import fetcher from "lib/fetcher"
import { useQuery } from '@tanstack/react-query'
import { ProductCards } from "components/ProductCards"
import { ProductDto } from "../lib/dto/types"

export const Products = () => {
  const { status, data } = useQuery({
    queryKey: ['products'],
    queryFn: () => fetcher<ProductDto[]>('https://fakestoreapi.com/products')
  })

  if (status === 'pending') return <p>Loading...</p>
  if (status === 'error') return <p>Error</p>


  return (
    <>
      {data.map((product) => (
        <ProductCards
          key={product.id}
          {...product}
        />
      ))}
    </>
  )
}