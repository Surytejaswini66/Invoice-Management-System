import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./index.css"; // Import the new styles

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic validation
    if (!email || !password) {
      setError("Both fields are required");
      return;
    }

    // Check if the user exists in localStorage
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find(
      (user) => user.email === email && user.password === password
    );

    if (!user) {
      setError("Invalid credentials");
    } else {
      // Successful login, redirect to the Home page
      navigate("/home");
    }
  };

  const handleSignUpRedirect = () => {
    // Navigate to the Sign Up page
    navigate("/signup");
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p>{error}</p>}
        <button type="submit">Login</button>
      </form>
      <button onClick={handleSignUpRedirect}>Sign Up</button>{" "}
      {/* Sign Up Button */}
    </div>
  );
};

export default Login;
