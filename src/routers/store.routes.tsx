import TempLayout from "layouts/AppShell"
import { AllProducts } from "pages/ProductsList"
import { SoloProductPage } from "pages/SoloProductPage"
import { Route, Routes, Navigate } from "react-router-dom"
import { CheckoutPage } from "pages/CheckoutPage"

export const StoreRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<TempLayout />}>
        <Route index element={<AllProducts />} />
        <Route path="products" element={<AllProducts />} />
        <Route path="/products/:id/" element={<SoloProductPage />} />
        <Route path="/products?sort=:sort" element={<AllProducts />} />
        <Route path="/checkout" element={<CheckoutPage />} />

        <Route path="*" element={<Navigate to="products" replace />} />
      </Route>
    </Routes>
  )
}
