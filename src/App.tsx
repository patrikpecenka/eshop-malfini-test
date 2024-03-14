import TempLayout from "layouts/AppShell"
import { ProductsListPage } from "pages/ProductsListPage"
import { SoloProductPage } from "pages/SoloProductPage"
import { Route, Routes, Navigate } from "react-router-dom"
import { CheckoutPage } from "pages/CheckoutPage"
import { ProfilePage } from "pages/OrderDetailPage"


const App = () => {
  return (
    <Routes>
      <Route element={<TempLayout />}>
        <Route path="/products" element={<ProductsListPage />} />
        <Route path="/products/:id/" element={<SoloProductPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/checkout" element={<CheckoutPage />} />


        <Route path="*" element={<Navigate to="/products" replace />} />
      </Route>
    </Routes>
  )
}

export default App
