import { useState } from "react";
import "./Login.css"; // Import the new CSS file
import authService from "../services/authService";

export default function Login() {
    const [name, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [login, setLogin] = useState(true);

    const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      if (login) {
        // Use authService for login
        const data = await authService.login(email, password);
        console.log("Login success:", data);
        // Handle successful login (e.g., save token, redirect)
      } else {
        // Signup validation
        if (password !== confirmPassword) {
          alert("Passwords do not match");
          return;
        }
        
        // Use authService for signup
        await authService.signup(name, email, password);
        alert("Signup successful! Please log in.");
        setLogin(true);
      }
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div>
      {login ? (
        <form onSubmit={handleSubmit} className="Login-form">
            <h2>SmartStudy AI</h2>
            <input
                type="email"
                placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input-field"
            required
            />
            <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input-field"
            required
            />
            <button type="submit">Login</button>
            <div className="Login-footer">
                <p>Don't have an account? <a onClick={() => setLogin(false)}>Sign up</a></p>
            </div>
        </form>
    ) : (
        <form onSubmit={handleSubmit} className="Login-form">
            <h2>SmartStudy AI</h2>
            <input
                type="text"
                placeholder="Create Username"
                value={name}
                onChange={(e) => setUsername(e.target.value)}
                className="input-field"
                required
            />
            <input
                type="email"
                placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input-field"
            required
            />
            <input
            type="password"
            placeholder="Create Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input-field"
            required
            />
            <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="input-field"
            required
            />
            <button type="submit">Sign Up</button>
            <div className="Login-footer">
                <p>Already have an account? <a onClick={() => setLogin(true)}>Log in</a></p>
            </div>
        </form>
        )}
    </div>
  );
}
