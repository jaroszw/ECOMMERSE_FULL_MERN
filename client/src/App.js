import { useEffect } from 'react';
import axios from 'axios';

function App() {
  useEffect(() => {
    const getUser = async () => {
      const response = await axios.post(
        'http://localhost:5000/user/login',
        {
          email: 'w@wp.pl',
          password: '123456',
        },
        {
          'Content-Type': 'application/json',
          withCredentials: true,
          credentials: 'include',
        }
      );

      console.log(response);
    };
    getUser();
  }, []);

  return <div className="App"></div>;
}

export default App;
