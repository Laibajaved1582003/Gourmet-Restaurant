import React, { useState } from 'react';
import axios from 'axios';
import '../signup.css'; // Reusing the same CSS for consistency
import { useLocation, useNavigate } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const navigate = useNavigate();
  const location = useLocation();

  const handleChange = (e) =>{
    const {name , value} = e.target;
    setFormData(prev=>({
      ...prev,
      [name] : value
    }))
  }

  const handleSubmit = async (e) =>{
    e.preventDefault();
    try{
      const response = await axios.post('http://127.0.0.1:8000/api/login/', formData);
      console.log(response);
      sessionStorage.setItem('token', JSON.stringify(response.data.token));
      const name=sessionStorage.setItem('name', response.data.name);
      sessionStorage.setItem('email', response.data.email);
      alert("Login successful");
      navigate('/')
    }catch(err){
      console.log(err)
    }
  }

  return (
    <section className="signup-page">
      <div className="box" name="login">
        <h1 className="heading">Login</h1>
        <div>
          <form id="signin-form" onSubmit={handleSubmit}>
            <div className="form-grp">
            <label htmlFor="email" style={{ display: 'block', marginBottom: '5px' }}>Email</label>
            <input
                type="email"
                id="email"
                placeholder="Email"
                name="email"
                onChange={handleChange}
                required
            />
            </div>
            <div className="form-grp">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                placeholder="Password"
                name="password"
                onChange={handleChange}
                required
              />
            </div>
            <button type="submit" className="signup-btn">Login</button>
            <div className="login">
              <p>
                Don’t have an account?{' '}
                <span
                  onClick={() => navigate('/signup')}
                  style={{ cursor: 'pointer', color: '#c99f28', fontWeight: 'bold' }}
                >
                  Sign Up
                </span>
              </p>
            </div>
          </form>

          {/* <a href="{% provider_login_url 'google' %}" className="google-btn">
            <img
              src="https://developers.google.com/identity/images/g-logo.png"
              alt="Google logo"
              className="google-icon"
            />
            <span>Sign in with Google</span>
          </a> */}
        </div>
      </div>
    </section>
  );
};

export default Login;
