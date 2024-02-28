import TempLayout from "layouts/AppShell"
import { Home } from "pages/Home"
import { ProductsPage } from "pages/ProductsPage"
import { Route, Routes, Navigate } from "react-router-dom"


export const StoreRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<TempLayout />}>
        <Route index element={<Home />} />
        <Route path="products" element={<ProductsPage />} />

        <Route path="*" element={<Navigate to="products" replace />} />

      </Route>
    </Routes>
  )
}
