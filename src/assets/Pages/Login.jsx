import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../../LoginStyle.css'

function Login() {

  const HardCodedEmail = "intern@demo.com";
  const HardCodedPassword = "pass123";

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (email === HardCodedEmail && password === HardCodedPassword) {
      localStorage.setItem("loggedIn", "true");
      navigate("/resume");
    }
    else {
      setError("Invalid email or password!");
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1 className="login-title">Interactive Resume</h1>
        <p className="login-subtitle">Use <strong>intern@demo.com / pass123</strong> to log in.</p>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label className="form-label">Email</label>
            <input
              className="form-input"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              type="email"
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Password</label>
            <input
              className="form-input"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              type="password"
              placeholder="Enter your password"
              required
            />
          </div>

          {error && <p className="error-message">{error}</p>}

          <button type="submit" className="login-button">Sign In</button>
        </form>
      </div>
    </div>
  )
}

export default Login
