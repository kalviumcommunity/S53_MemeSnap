import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCookies } from 'react-cookie'
import axios from 'axios';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [cookies, setCookie] = useCookies(["access_token"]);


  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log('Logged In:', { email, password });
    try{
      const response = await axios.post("https://memesnap.onrender.com/api/auth/Login", {email, password})
      console.log(response);
      setCookie("access_token", response.data.token);
      location.href = "/Mainpage"
    }
    catch(err){
      console.log(err)
    }
    // Here you can add logic to send the login data to your server
  }

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;