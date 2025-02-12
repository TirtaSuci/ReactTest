import React from "react";
import "./index.css";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import PageError from "./pages/404.jsx";
import Home from "./pages/Home.jsx";
import ProductPage from "./pages/Product.jsx";

const root = document.getElementById("root");

ReactDOM.createRoot(root).render(
  <BrowserRouter>
    <Routes>
      <Route exact path="/" element={<Home />} />
      <Route path="*" element={<PageError />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/product" element={<ProductPage/>} />
    </Routes>
  </BrowserRouter>
);
