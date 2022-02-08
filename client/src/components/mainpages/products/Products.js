import React, { useContext, useState } from "react";
import { GlobalState } from "../../../GlobalState";
import ProductItem from "../utils/productItem/ProductItem";
import Loading from "../utils/loading/Loading";
import axios from "axios";
import Filters from "./Filters";
import LoadMore from "./LoadMore";

const Products = () => {
  const state = useContext(GlobalState);
  const [products, setProducts] = state.productsAPI.products;
  const [callback, setCallback] = state.productsAPI.callback;
  const [token] = state.token;
  const [isAdmin] = state.userAPI.isAdmin;
  const [isCheck, setIsCheck] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleCheck = (id) => {
    products.forEach((product) => {
      if (product._id === id) {
        product.checked = !product.checked;
      }
    });
    setProducts([...products]);
  };

  const checkAll = () => {
    products.forEach((product) => (product.checked = !product.checked));
    setIsCheck(!isCheck);
  };

  const deleteAll = () => {
    products.forEach((product) => {
      if (product.checked) {
        deleteProduct(product.images.public_id, product._id);
      }
    });
  };

  const deleteProduct = async (id, public_id) => {
    console.log(id, public_id);
    try {
      setIsLoading(true);
      const destroyImg = axios.post(
        `http://localhost:5000/api/destroy`,
        { public_id },
        { headers: { Authorization: token } }
      );

      const destroyProduct = axios.delete(
        `http://localhost:5000/api/products/${id}`,
        { headers: { Authorization: token } }
      );

      await destroyImg;
      await destroyProduct;
      setCallback(!callback);
      setIsLoading(false);
    } catch (error) {
      console.dir(error);
    }
  };

  if (isLoading)
    return (
      <div>
        <Loading />
      </div>
    );

  return (
    <React.Fragment>
      <Filters />
      {isAdmin && (
        <div className="delete-all">
          <span>Select All</span>
          <input type="checkbox" checked={isCheck} onChange={checkAll} />
          <button onClick={deleteAll}>Delete ALL</button>
        </div>
      )}

      <div className="products">
        {products.map((product) => {
          return (
            <ProductItem
              key={product._id}
              product={product}
              isAdmin={isAdmin}
              deleteProduct={deleteProduct}
              handleCheck={handleCheck}
            />
          );
        })}
      </div>
      {products.length === 0 && <Loading />}

      <LoadMore />
    </React.Fragment>
  );
};
export default Products;
