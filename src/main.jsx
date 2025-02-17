import React from "react";
import "./index.css";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import PageError from "./pages/404.jsx";
import Home from "./pages/Home.jsx";
import ProductPage from "./pages/Product.jsx";
import ProfilePage from "./pages/Profile.jsx";
import DetailProductPage from "./pages/DetailProduct.jsx";
import { Provider } from "react-redux";
import store from "./redux/store.js";
import DarkModeContextProvider from "./component/context/DarkMode.jsx";
import { TotalPriceProvider } from "./component/context/TotalPriceContext.jsx";
import CartProductPage from "./pages/CartProduct.jsx";
import { ExchangeRateProvider } from "./component/context/ExchangeMoney.jsx";

const root = document.getElementById("root");

const router = createBrowserRouter([
  {
    path: "/", element: <Home />, errorElement: <PageError />,
  },
  {
    path: "/login", element: <Login />
  },
  {
    path: "/register", element: <Register />
  },
  {
    path: "/products", element: <ProductPage />
  },
  {
    path: "/profile", element: <ProfilePage />
  },
  {
    path: "/product/:id", element: <DetailProductPage />
  },
  {
    path: "/cartproduct", element: <CartProductPage />
  }
])

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <DarkModeContextProvider>
        <ExchangeRateProvider>
          <TotalPriceProvider>
            <RouterProvider router={router} ></RouterProvider>
          </TotalPriceProvider>
        </ExchangeRateProvider>
      </DarkModeContextProvider>
    </Provider>
  </React.StrictMode>
);
