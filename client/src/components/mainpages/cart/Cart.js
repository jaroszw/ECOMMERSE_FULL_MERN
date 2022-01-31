import React, { useContext, useEffect, useState } from "react";
import { GlobalState } from "../../../GlobalState";
import axios from "axios";
import PaypalButton from "./PayPal.js";

const Cart = () => {
  const state = useContext(GlobalState);
  const [cart, setCart] = state.userAPI.cart;
  const [total, setTotal] = useState(0);
  const [token, setToken] = state.token;

  const addToCart = async (cart) => {
    try {
      await axios.patch(
        "http://localhost:5000/user/addcart",
        { cart },
        {
          headers: { Authorization: token },
        }
      );
    } catch (error) {
      console.dir(error);
    }
  };

  useEffect(() => {
    const getTotal = () => {
      const total = cart.reduce((prev, prod) => {
        return (prev += prod.price * prod.quantity);
      }, 0);
      setTotal(total);
    };
    getTotal();
  }, [cart]);

  const increment = async (id) => {
    cart.forEach((item) => {
      if (item._id === id) {
        item.quantity += 1;
      }
    });
    addToCart();
    setCart([...cart]);
  };

  const decrement = (id) => {
    cart.forEach((item) => {
      if ((item._id === id) & (item.quantity === 1)) {
        item.quantity = 1;
      } else {
        item.quantity -= 1;
      }
    });
    addToCart();
    setCart([...cart]);
  };

  const deleteProduct = (id) => {
    if (window.confirm("Do you want to delete this product")) {
      cart.forEach((item, index) => {
        if (item._id === id) {
          cart.splice(index, 1);
        }
      });

      addToCart();
      setCart([...cart]);
    }
  };

  const tranSuccess = async (payment) => {
    const { paymentID, address } = payment;

    try {
      await axios.post(
        "/api/payment",
        { cart, paymentID, address },
        {
          headers: { Authorization: token },
        }
      );
    } catch (error) {
      console.dir(error);
    }

    setCart([]);
    addToCart([]);
    alert("You have successfully placed an order.");
  };

  if (cart.length === 0) {
    return (
      <h2 style={{ textAlign: "center", fontSize: "5rem" }}>Cart is Empty</h2>
    );
  }

  return (
    <div>
      {cart.map((product) => (
        <div className="detail cart" key={product._id}>
          <img src={product.images.url} alt="" />

          <div className="box-detail">
            <h2>{product.title}</h2>

            <div>
              <h3>price - ${product.price} </h3>
            </div>
            <p>{product.description}</p>
            <p>{product.content}</p>

            <div className="amount">
              <button onClick={() => decrement(product._id)}> - </button>
              <span>{product.quantity}</span>
              <button onClick={() => increment(product._id)}> + </button>
              <h3> Sum - ${product.price * product.quantity}</h3>
            </div>

            <div className="delete" onClick={() => deleteProduct(product._id)}>
              X
            </div>
          </div>
        </div>
      ))}
      <div className="total">
        <h3>Total: ${total}</h3>
        <PaypalButton total={total} tranSuccess={tranSuccess} />
      </div>
    </div>
  );
};

export default Cart;
