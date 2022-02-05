import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { GlobalState } from '../../../GlobalState';

const OrderDetail = () => {
  const state = useContext(GlobalState);
  const [history] = state.userAPI.history;
  const [orderDetail, setOrderDetail] = useState([]);

  const { id } = useParams();

  useEffect(() => {
    if (id) {
      history.forEach((item) => {
        if (item._id === id) {
          setOrderDetail(item);
        }
      });
    }
  }, [id, history]);

  if (orderDetail.length === 0) return null;

  return (
    <div className="history-page">
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Address</th>
            <th>Postal Code</th>
            <th>Country Code</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{orderDetail.address.recipient_name}</td>
            <td>
              {orderDetail.address.line1 + ' - ' + orderDetail.address.city}
            </td>
            <td>{orderDetail.address.postal_code}</td>
            <td>{orderDetail.address.country_code}</td>
          </tr>
        </tbody>
      </table>

      <table style={{ margin: '30px 0px' }}>
        <thead>
          <tr>
            <th>Image</th>
            <th>Product</th>
            <th>Quantity</th>
            <th>Price </th>
          </tr>
        </thead>
        <tbody>
          {orderDetail.cart.map((order) => (
            <tr key={order._id}>
              <td>
                <img src={order.images.url} alt="" />
              </td>
              <td>{order.title}</td>
              <td>{order.quantity}</td>
              <td>{order.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderDetail;
