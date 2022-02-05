import { createContext, useState, useEffect } from 'react';
import ProductsAPI from './api/ProductsAPI';
import userAPI from './api/UserAPI';
import CategoriesAPI from './api/CategoriesAPI';
import axios from 'axios';

export const GlobalState = createContext();

axios.defaults.withCredentials = true;

export const DataProvider = ({ children }) => {
  const [token, setToken] = useState(false);

  useEffect(() => {
    const refreshToken = async () => {
      console.log('REFRESHING');
      const res = await axios.get('http://localhost:5000/user/refresh_token');
      setToken(res.data.accesstoken);

      setTimeout(() => {
        refreshToken();
      }, 15000);
    };

    refreshToken();
  }, []);

  const state = {
    token: [token, setToken],
    productsAPI: ProductsAPI(),
    userAPI: userAPI(token),
    categoriesAPI: CategoriesAPI(),
  };

  return <GlobalState.Provider value={state}>{children}</GlobalState.Provider>;
};
