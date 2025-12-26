import React, { useState } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';

const Login = ({ setToken }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/auth/login', { email, password });
      
      // Save token
      const token = res.data.token;
      localStorage.setItem('token', token);
      setToken(token);
      
      navigate('/'); // Go to Dashboard
    } catch (err) {
      setError('Invalid credentials. Try again.');
    }
  };

  const styles = {
    container: {
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: 'linear-gradient(135deg, #1F2937 0%, #111827 100%)',
        fontFamily: 'sans-serif'
    },
    card: {
        background: 'white',
        padding: '40px',
        borderRadius: '16px',
        width: '100%',
        maxWidth: '400px',
        boxShadow: '0 10px 25px rgba(0,0,0,0.2)'
    },
    title: {
        textAlign: 'center',
        color: '#111827',
        fontSize: '1.8rem',
        marginBottom: '10px'
    },
    subtitle: {
        textAlign: 'center',
        color: '#6B7280',
        marginBottom: '30px',
        fontSize: '0.9rem'
    },
    inputGroup: {
        marginBottom: '20px'
    },
    label: {
        display: 'block',
        marginBottom: '8px',
        fontSize: '0.9rem',
        color: '#374151',
        fontWeight: '500'
    },
    input: {
        width: '100%',
        padding: '12px',
        borderRadius: '8px',
        border: '1px solid #D1D5DB',
        fontSize: '1rem',
        boxSizing: 'border-box'
    },
    button: {
        width: '100%',
        padding: '12px',
        background: '#4F46E5',
        color: 'white',
        border: 'none',
        borderRadius: '8px',
        fontSize: '1rem',
        fontWeight: '600',
        cursor: 'pointer',
        transition: 'background 0.2s'
    },
    error: {
        background: '#FEE2E2',
        color: '#B91C1C',
        padding: '10px',
        borderRadius: '6px',
        marginBottom: '20px',
        textAlign: 'center',
        fontSize: '0.9rem'
    }
  };

  return (
    <div style={styles.container}>
        <div style={styles.card}>
            <div style={{textAlign: 'center', fontSize: '3rem', marginBottom: '10px'}}>🚀</div>
            <h2 style={styles.title}>Welcome Back</h2>
            <p style={styles.subtitle}>Sign in to manage your consultancy</p>
            
            {error && <div style={styles.error}>{error}</div>}

            <form onSubmit={handleSubmit}>
                <div style={styles.inputGroup}>
                    <label style={styles.label}>Email Address</label>
                    <input 
                        type="email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        style={styles.input} 
                        placeholder="admin@consultancy.com"
                        required
                    />
                </div>
                <div style={styles.inputGroup}>
                    <label style={styles.label}>Password</label>
                    <input 
                        type="password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        style={styles.input} 
                        placeholder="••••••••"
                        required
                    />
                </div>
                <button type="submit" style={styles.button}>Sign In</button>
            </form>
        </div>
    </div>
  );
};

export default Login;