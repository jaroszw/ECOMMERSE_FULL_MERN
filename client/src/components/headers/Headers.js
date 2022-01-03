import React, { useContext } from "react";
import menu from "./icon/menu.svg";
import cart from "./icon/cart.svg";
import close from "./icon/close.svg";

import { Link } from "react-router-dom";
import { GlobalState } from "../../GlobalState";
import axios from "axios";

const Headers = () => {
  const state = useContext(GlobalState);
  const [isLogged, setIsLogged] = state.userAPI.isLogged;
  const [isAdmin, setIsAdmin] = state.userAPI.isAdmin;

  const logoutUser = () => {
    axios.get("http://localhost:5000/user/logout");
    localStorage.clear();
    setIsAdmin(false);
    setIsLogged(false);
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
          <Link to="/">{isAdmin ? "Admin" : "Pan W. Shop"}</Link>
        </h1>
      </div>

      <ul>
        <li>
          <Link to="/">{isAdmin ? "Products" : "Shop"}</Link>
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
          <img src={close} alt="" width="30" />
        </li>
      </ul>
      {isAdmin ? (
        " "
      ) : (
        <div className="cart-icon">
          1<span>0</span>
          <Link to="/cart">
            <img src={cart} alt="" width="30" />
          </Link>
        </div>
      )}
    </header>
  );
};

export default Headers;
