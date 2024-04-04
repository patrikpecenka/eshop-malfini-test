import { AppShellLayout } from "@layouts/AppShellLayout";
import { ProductsListPage } from "@pages/ProductsListPage/ProductsListPage";
import { ProductDetailPage } from "@pages/ProductDetailPage/ProductDetailPage";
import { Route, Routes, Navigate } from "react-router-dom";
import { CheckoutPage } from "@pages/CheckoutPage/CheckoutPage";
import { OrderDetailPage } from "@pages/OrdersDetailPage/OrderDetailPage";
import { FavoritePage } from "@pages/FavoritePage/FavoritePage";
const App = () => {
  return (
    <Routes >
      <Route element={<AppShellLayout />}>
        <Route path="/products" element={<ProductsListPage />} />
        <Route path="/products/:id" element={<ProductDetailPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/favorite" element={<FavoritePage />} />
        <Route path="/profile/:id?" element={<OrderDetailPage />} />
        <Route path="*" element={<Navigate to="/products" replace />} />
      </Route>
    </Routes>
  );
};

export default App;
