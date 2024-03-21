import { useQuery } from "@tanstack/react-query";
import { SoloProduct } from "components/SoloProduct";
import { ProductDto } from "lib/dto/types";
import fetcher from "lib/fetcher";
import { Navigate, useParams } from "react-router-dom";


export const SoloProductPage = () => {
  const { id } = useParams();

  const { data, status } = useQuery({
    queryKey: ['products', id],
    queryFn: () => fetcher<ProductDto>(`https://fakestoreapi.com/products/${id}`),
    enabled: !!id
  });

  if (status === 'pending') return <p>Loading...</p>;
  if (status === 'error') return <Navigate to="/products" />;

  return (
    <SoloProduct product={data} />
  );
};