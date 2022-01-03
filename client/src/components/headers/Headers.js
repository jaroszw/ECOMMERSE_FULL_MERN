import React, { useContext } from 'react';
import menu from './icon/menu.svg';
import Cart from './icon/cart.svg';
import Close from './icon/close.svg';

import { Link } from 'react-router-dom';
import { GlobalState } from '../../GlobalState';
import axios from 'axios';

const Headers = () => {
  const state = useContext(GlobalState);
  const [isLogged] = state.userAPI.isLogged;
  const [isAdmin] = state.userAPI.isAdmin;
  const [cart] = state.userAPI.cart;

  const logoutUser = () => {
    axios.get('http://localhost:5000/user/logout');
    localStorage.clear();
    window.location.href = '/';
  };

  const adminRouter = () => {
    return (
      <React.Fragment>
        <li>
          <Link to="/create_product">Create Products</Link>
        </li>
        <li>
          <Link to="/category">Category</Link>
        </li>
      </React.Fragment>
    );
  };
  const loggedRouter = () => {
    return (
      <React.Fragment>
        <li>
          <Link to="/history">Hisotry</Link>
        </li>
        <li>
          <Link to="/" onClick={logoutUser}>
            Logout
          </Link>
        </li>
      </React.Fragment>
    );
  };

  return (
    <header>
      <div className="menu">
        <img src={menu} alt="" width="30" />
      </div>
      <div className="logo">
        <h1>
          <Link to="/">{isAdmin ? 'Admin' : 'Pan W. Shop'}</Link>
        </h1>
      </div>

      <ul>
        <li>
          <Link to="/">{isAdmin ? 'Products' : 'Shop'}</Link>
        </li>

        {isAdmin && adminRouter()}

        <li>
          {isLogged ? (
            loggedRouter()
          ) : (
            <Link to="/login">Login x Registration</Link>
          )}
        </li>

        <li>
          <img src={Close} alt="" width="30" className="menu" />
        </li>
      </ul>
      {isAdmin ? (
        ''
      ) : (
        <div className="cart-icon">
          <span>{cart.length}</span>
          <Link to="/cart">
            <img src={Cart} alt="" width="30" />
          </Link>
        </div>
      )}
    </header>
  );
};

export default Headers;
