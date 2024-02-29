import TempLayout from "layouts/AppShell"
import { AllProducts } from "pages/ProductsList"
import { Home } from "pages/Home"
import { SoloProductPage } from "pages/SoloProductPage"
import { Route, Routes, Navigate } from "react-router-dom"


export const StoreRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<TempLayout />}>
        <Route index element={<Home />} />
        <Route path="products" element={<AllProducts />} />
        <Route path="/products/:id/" element={<SoloProductPage />} />

        <Route path="*" element={<Navigate to="products" replace />} />
      </Route>
    </Routes>
  )
}
