import { useEffect, useState } from 'react';
import axios from 'axios';

const ProductsAPI = () => {
  const [products, setProducts] = useState([]);

  const getProducts = async () => {
    console.log('GETTING PRODUCTS');
    const res = await axios.get('/api/products');
    setProducts(res.data.products);
  };

  useEffect(() => {
    getProducts();
  }, []);

  return { products: [products, setProducts] };
};

export default ProductsAPI;
