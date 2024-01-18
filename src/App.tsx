import { Navigate, Route, Routes } from "react-router-dom";
import { HomePage, LoginPage, ProductPage, RegisterPage } from "./pages";
import { useAppSelector } from "./redux/hooks";
import { AuthState, authSelector } from "./redux/features/authReducer";
import Layout from "./components/layout";

const AppRoutes = () => {
  const authState: AuthState = useAppSelector(authSelector);
  return (
    <Routes>
      {authState.isLoggedIn ? (
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<ProductPage />} />
        </Route>
      ) : (
        <>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </>
      )}
    </Routes>
  );
};

export default AppRoutes;
