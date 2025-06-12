import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../services/auth';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await loginUser({ email, password });
      localStorage.setItem('token', res.data.token);
      navigate('/dashboard');
    } catch {
      alert('Invalid credentials');
    }
  };

  return (
    <div style={{ backgroundColor: '#111', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <form onSubmit={handleSubmit} style={{ backgroundColor: '#222', padding: 40, borderRadius: 10 }}>
        <h2 style={{ color: '#fff' }}>Login</h2>
        <input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} style={inputStyle} />
        <input placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} style={inputStyle} />
        <button type="submit" style={btnStyle}>Login</button>
      </form>
    </div>
  );
};

const inputStyle = { padding: 10, margin: '10px 0', width: '100%', borderRadius: 5 };
const btnStyle = { padding: 10, width: '100%', backgroundColor: '#fff', border: 'none', borderRadius: 5 };

export default Login;
