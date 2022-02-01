import React, { useContext, useEffect, useState } from 'react';
import { GlobalState } from '../GlobalState';
import axios from 'axios';

const CategoriesAPI = () => {
  const [categories, setCategories] = useState([]);
  const [callback, serCallback] = useState(false);

  useEffect(() => {
    const getCategories = async () => {
      const res = await axios.get('http://localhost:5000/api/category');
      setCategories(res.data);
    };

    getCategories();
  }, [callback]);

  return {
    categories: [categories, setCategories],
    callback: [callback, serCallback],
  };
};

export default CategoriesAPI;
