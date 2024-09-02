import React, { useState } from 'react';
import "../Login.css"
import {useNavigate} from "react-router-dom"

const Login = ({ setUser }) => {
  const [email, setEmail] = useState('');
  const navigate = useNavigate()
  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem('user', email);
    setUser(email);
    const userWatchlist = JSON.parse(localStorage.getItem(`${email}_watchlist`)) || [];
    localStorage.setItem(`${email}_watchlist`, JSON.stringify(userWatchlist));
    navigate("/")
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Login</h2>
        <input className='form-input'
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          required
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
