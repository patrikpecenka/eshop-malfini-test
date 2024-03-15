import { useQuery } from "@tanstack/react-query"
import { SoloProduct } from "components/SoloProduct"
import { ProductDto } from "lib/dto/types"
import fetcher from "lib/fetcher"
import { Navigate, useParams } from "react-router-dom"
import { motion } from "framer-motion";

export const SoloProductPage = () => {
  const { id } = useParams()

  const { data, status } = useQuery({
    queryKey: ['products', id],
    queryFn: () => fetcher<ProductDto>(`https://fakestoreapi.com/products/${id}`),
    enabled: !!id
  })

  if (status === 'pending') return <p>Loading...</p>
  if (status === 'error') return <Navigate to="/products" />

  console.log(navigator.language)

  return (
    <motion.div
      key="solo-page"
      initial={{ x: "20%", opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: "-20%", opacity: 0, transition: { duration: 0.2 } }}
      transition={{ delay: 0, duration: 0.2 }}
    >
      <SoloProduct product={data} />
    </motion.div>
  )
}