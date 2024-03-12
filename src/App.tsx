import TempLayout from "layouts/AppShell"
import { ProductsList } from "pages/ProductsList"
import { SoloProductPage } from "pages/SoloProductPage"
import { Route, Routes, Navigate } from "react-router-dom"
import { CheckoutPage } from "pages/CheckoutPage"


const App = () => {
  return (
    <Routes>
      <Route element={<TempLayout />}>
        <Route path="/products" element={<ProductsList />} />
        <Route path="/products/:id/" element={<SoloProductPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />

        <Route path="*" element={<Navigate to="/products" replace />} />
      </Route>
    </Routes>
  )
}

export default App
