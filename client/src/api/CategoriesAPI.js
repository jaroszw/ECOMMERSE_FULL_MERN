import { useEffect, useState } from 'react';
import axios from 'axios';

const CategoriesAPI = () => {
  const [categories, setCategories] = useState([]);
  const [callback, serCallback] = useState(false);

  useEffect(() => {
    const getCategories = async () => {
      console.log('GETTING CATEGORIES');
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
