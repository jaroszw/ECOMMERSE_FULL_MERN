import { createContext, useState, useEffect } from "react";
import ProductsAPI from "./api/ProductsAPI";
import userAPI from "./api/UserAPI";
import axios from "axios";

export const GlobalState = createContext();
axios.defaults.withCredentials = true;

export const DataProvider = ({ children }) => {
  const [token, setToken] = useState(false);

  console.log("CONTEXT API SET WITHOUT TOKEN FIRST");

  const refreshToken = async () => {
    const res = await axios.get("http://localhost:5000/user/refresh_token", {
      headers: { withCredentials: true },
    });
    setToken(res.data.accesstoken);
  };

  useEffect(() => {
    console.log("CONTEXT API USE EFFECT REFRESHES TOKEN STARTS");
    const firstLogin = localStorage.getItem("firstLogin");
    if (firstLogin) {
      console.log("CONTEXT API REFRESHES TOKEN WITH TOKEN");
      refreshToken();
    }
  }, []);

  const state = {
    token: [token, setToken],
    productsAPI: ProductsAPI(),
    userAPI: userAPI(token),
  };

  return <GlobalState.Provider value={state}>{children}</GlobalState.Provider>;
};
