import React, { useContext } from "react";
import menu from "./icon/menu.svg";
import cart from "./icon/cart.svg";
import close from "./icon/close.svg";

import { Link } from "react-router-dom";
import { GlobalState } from "../../GlobalState";

const Headers = () => {
  const state = useContext(GlobalState);
  console.log(state);

  return (
    <header>
      <div className="menu">
        <img src={menu} alt="" width="30" />
      </div>
      <div className="logo">
        <h1>
          <Link to="/">Pan W. Shop</Link>
        </h1>
      </div>

      <ul>
        <li>
          <Link to="/">Products</Link>
        </li>
        <li>
          <Link to="/login">Login x Registration</Link>
        </li>
        <li>
          <img src={close} alt="" width="30" />
        </li>
      </ul>
      <div className="cart-icon">
        <span>0</span>
        <Link to="/cart">
          <img src={cart} alt="" width="30" />
        </Link>
      </div>
    </header>
  );
};

export default Headers;
