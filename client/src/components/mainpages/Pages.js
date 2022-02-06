import React, { useContext } from 'react';
import { Routes, Route } from 'react-router-dom';
import Products from './products/Products';
import DetailProduct from './detailProduct/DetailProduct';
import Login from './auth/Login';
import Register from './auth/Register';
import OrderHistory from './history/OrderHistory';
import OrderDetail from './history/OrderDetail';
import Categories from './../mainpages/categories/Categories';
import Cart from './cart/Cart';
import NoFound from './utils/not_found/NoFound';
import CreateProduct from './createProduct/CreateProduct';

import { GlobalState } from '../../GlobalState';

const Pages = () => {
  const state = useContext(GlobalState);
  const [isLogged] = state.userAPI.isLogged;
  const [isAdmin] = state.userAPI.isAdmin;

  return (
    <Routes>
      <Route path="/" exact element={<Products />} />
      <Route path="/detail/:id" element={<DetailProduct />} />
      <Route path="/login" element={isLogged ? 'Not Found' : <Login />} />

      <Route path="/register" element={isLogged ? 'Not Found' : <Register />} />

      <Route
        path="/category"
        element={isAdmin ? <Categories /> : 'Not Found'}
      />
      <Route
        path="/create_product"
        element={isAdmin ? <CreateProduct /> : 'Not Found'}
      />

      <Route
        path="/edit_product/:id"
        element={isAdmin ? <CreateProduct /> : 'Not Found'}
      />

      <Route
        path="/history"
        element={isLogged ? <OrderHistory /> : 'Not Found'}
      />
      <Route
        path="/history/:id"
        element={isLogged ? <OrderDetail /> : 'Not Found'}
      />

      <Route path="/cart" element={<Cart />} />
      <Route path="/*" element={<NoFound />} />
    </Routes>
  );
};

export default Pages;
