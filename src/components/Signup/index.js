import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./index.css"; // Import the same styles for SignUp

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic validation
    if (!name || !email || !password) {
      setError("All fields are required");
      return;
    }

    // Check if the user already exists in localStorage
    const existingUser = JSON.parse(localStorage.getItem("users")) || [];
    const userExists = existingUser.some((user) => user.email === email);

    if (userExists) {
      setError("Email already exists");
      return;
    }

    // Add the new user to the users list in localStorage
    const newUser = { name, email, password };
    existingUser.push(newUser);
    localStorage.setItem("users", JSON.stringify(existingUser));

    // Redirect to the login page after successful sign-up
    navigate("/login");
  };

  return (
    <div className="signup-container">
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
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
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default SignUp;
