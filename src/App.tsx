import TempLayout from "layouts/AppShell"
import { ProductsListPage } from "pages/ProductsListPage"
import { SoloProductPage } from "pages/SoloProductPage"
import { Route, Routes, Navigate, useLocation } from "react-router-dom"
import { CheckoutPage } from "pages/CheckoutPage"
import { ProfilePage } from "pages/OrderDetailPage"
import { AnimatePresence } from "framer-motion"


const App = () => {
  const location = useLocation()

  return (
    <AnimatePresence mode="wait" initial={false} onExitComplete={() => window.scrollTo(0, 0)}>
      <Routes location={location} key={location.pathname}>
        <Route element={<TempLayout />}>
          <Route path="/products" element={<ProductsListPage />} />
          <Route path="/products/:id/" element={<SoloProductPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/checkout" element={<CheckoutPage />} />


          <Route path="*" element={<Navigate to="/products" replace />} />
        </Route>
      </Routes>
    </AnimatePresence >
  )
}

export default App
