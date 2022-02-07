import { useEffect, useState } from 'react';
import axios from 'axios';

const ProductsAPI = () => {
  const [products, setProducts] = useState([]);
  const [callback, setCallback] = useState(false);
  
  const [category, setCategory] = useState('');
  const [sort, setSort] = useState('');
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [result, setResult] = useState(0);

  const getProducts = async () => {
    const res = await axios.get(
      `/api/products?limit=${
        page * 9
      }&${category}&${sort}&itle[regex]=${search}`
    );

    setProducts(res.data.products);
    // setProducts(res.data.result);
  };

  useEffect(() => {
    getProducts();
  }, [callback]);

  return {
    products: [products, setProducts],
    callback: [callback, setCallback],
    category: [category, setCategory],
    sort: [sort, setSort],
    search: [search, setSearch],
    page: [page, setPage],
    result: [result, setResult],
  };
};

export default ProductsAPI;
