import { AppShellLayout } from "layouts/AppShellLayout";
import { ProductsListPage } from "pages/ProductsListPage";
import { SoloProductPage } from "pages/ProductDetailPage";
import { Route, Routes, Navigate, useLocation } from "react-router-dom";
import { CheckoutPage } from "pages/CheckoutPage";
import { ProfilePage } from "pages/OrderDetailPage";
import { FavoritePage } from "pages/FavoritePage";
const App = () => {
  const location = useLocation();

  return (
    <Routes location={location} key={location.pathname}>
      <Route element={<AppShellLayout />}>
        <Route path="/products" element={<ProductsListPage />} />
        <Route path="/products/:id/" element={<SoloProductPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/favorite" element={<FavoritePage />} />

        <Route element={<ProfilePage />} >
          <Route path="/profile/" element={<ProfilePage />} />
        </Route >

        <Route path="*" element={<Navigate to="/products" replace />} />
      </Route>
    </Routes>
  );
};

export default App;
