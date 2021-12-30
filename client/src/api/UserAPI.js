import React, { useState, useEffect } from "react";
import axios from "axios";

const UserAPI = (token) => {
  const [isLogged, setIsLogged] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    console.log("USE EFFECT IN USER API STARTS");
    if (token) {
      const getUser = async () => {
        try {
          const res = await axios.get("http://localhost:5000/user/infor", {
            headers: { Authorization: token },
          });

          console.log("AFTETR SETTING TOKEN - FETCHING USER");
          console.log(res);
        } catch (error) {
          alert(error.response.data.msg);
        }
      };

      getUser();
    }

    console.log("NO TOKEN IN USERS API");
  }, [token]);

  return { isLogged: [isLogged, setIsLogged], isAdmin: [isAdmin, setIsAdmin] };
};

export default UserAPI;
