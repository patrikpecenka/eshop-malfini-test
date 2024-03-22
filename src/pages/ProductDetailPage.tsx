import { useQuery } from "@tanstack/react-query";
import { SoloProductSkeleton } from "components/Skeletons/SoloProductSkeleton";
import { ProductDto } from "lib/dto/types";
import fetcher from "lib/fetcher";
import { Suspense, lazy } from "react";
import { Navigate, useParams } from "react-router-dom";

const SoloProduct = lazy(() => import("../components/SoloProduct"));


export const ProductDetailPage = () => {
  const { id } = useParams();

  const { data, status } = useQuery({
    queryKey: ['products', id],
    queryFn: () => fetcher<ProductDto>(`https://fakestoreapi.com/products/${id}`),
    enabled: !!id
  });

  if (status === 'pending') return;
  if (status === 'error') return <Navigate to="/products" />;

  return (
    <Suspense fallback={<SoloProductSkeleton />}>
      <SoloProduct product={data} />
    </Suspense>
  );
};