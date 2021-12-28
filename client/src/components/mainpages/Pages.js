import React from "react";
import { Routes, Route } from "react-router-dom";
import Products from "./products/Products";
import DetailProduct from "./detailProduct/DetailProduct";
import Login from "./auth/Login";
import Register from "./auth/Register";
import Cart from "./cart/Cart";
import NoFound from "./utils/not_found/NoFound";

const Pages = () => {
  return (
    <Routes>
      <Route path="/" exact element={<Products />} />
      <Route path="/detail/:id" element={<DetailProduct />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/*" element={<NoFound />} />
    </Routes>
  );
};

export default Pages;
