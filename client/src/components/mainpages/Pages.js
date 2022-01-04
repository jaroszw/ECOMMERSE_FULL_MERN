import React, { useContext } from "react";
import { Routes, Route } from "react-router-dom";
import Products from "./products/Products";
import DetailProduct from "./detailProduct/DetailProduct";
import Login from "./auth/Login";
import Register from "./auth/Register";
import Cart from "./cart/Cart";
import NoFound from "./utils/not_found/NoFound";

import { GlobalState } from "../../GlobalState";

const Pages = () => {
  const state = useContext(GlobalState);
  const [isLogged] = state.userAPI.isLogged;

  return (
    <Routes>
      <Route path="/" exact element={<Products />} />
      <Route path="/detail/:id" element={<DetailProduct />} />
      <Route path="/login" element={isLogged ? "Not Found" : <Login />} />
      <Route path="/register" element={isLogged ? "Not Found" : <Register />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/*" element={<NoFound />} />
    </Routes>
  );
};

export default Pages;
