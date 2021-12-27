import React, { useEffect, useState } from "react";
import axios from "axios";

const ProductsAPI = () => {
  const [products, setProducts] = useState([]);

  const getProducts = async () => {
    const res = await axios.get("/api/products");
    console.log("RESULTS FROM API", res);
  };

  useEffect(() => {
    getProducts();
  }, []);

  return { products: [products, setProducts] };
};

export default ProductsAPI;
