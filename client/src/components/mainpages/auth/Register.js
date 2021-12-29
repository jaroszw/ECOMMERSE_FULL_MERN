import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
  const [user, setUser] = useState({
    email: '',
    password: '',
    name: '',
  });

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const registerSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post('http://localhost:5000/user/register', { ...user });
      localStorage.setItem('firstLogin', true);
      window.location.href = '/';
    } catch (error) {
      alert(error.response.data.msg);
    }
  };

  return (
    <div className="login-page">
      <form onSubmit={registerSubmit}>
        <h2>Register</h2>
        <input
          type="text"
          name="name"
          required
          placeholder="Name"
          value={user.name}
          onChange={onChangeInput}
        />
        <input
          type="email"
          name="email"
          required
          placeholder="Email"
          value={user.email}
          onChange={onChangeInput}
        />
        <input
          type="password"
          name="password"
          required
          placeholder="Password"
          value={user.password}
          autoComplete="on"
          onChange={onChangeInput}
        />
        <div className="row">
          <button type="submit">Register</button>
          <Link to="/login">Login</Link>
        </div>
      </form>
    </div>
  );
};

export default Register;
