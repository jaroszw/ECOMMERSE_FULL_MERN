import React, { useContext, useState } from 'react';
import { GlobalState } from '../../../GlobalState';
import { Link } from 'react-router-dom';

const Cart = () => {
  const state = useContext(GlobalState);
  const [cart] = state.userAPI.cart;
  const [total, setTotal] = useState(0);

  if (cart.length === 0) {
    return (
      <h2 style={{ textAlign: 'center', fontSize: '5rem' }}>Cart is Empty</h2>
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
              <button> - </button>
              <span>{product.quantity}</span>
              <button> + </button>
              <h3> Sum - ${product.price * product.quantity}</h3>
            </div>

            <div className="delete">X</div>
          </div>
        </div>
      ))}
      <div className="total">
        <h3>Total: $0</h3>
        <Link to="#!">Payment</Link>
      </div>
    </div>
  );
};

export default Cart;
