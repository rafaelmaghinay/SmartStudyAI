import { useState } from "react";
import "./Login.css"; // Import the new CSS file

export default function Login() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [login, setLogin] = useState(true);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (login) {
      // Login API call
      try {
        const response = await fetch("https://localhost:8080/api/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        });
        const data = await response.json();
        if (response.ok) {
          // Handle successful login (e.g., save token, redirect)
          console.log("Login success:", data);
        } else {
          // Handle login error
          alert(data.message || "Login failed");
        }
      } catch (error) {
        alert("Network error: " + error.message);
      }
    } else {
      // Signup API call
      if (password !== confirmPassword) {
        alert("Passwords do not match");
        return;
      }
      try {
        const response = await fetch("https://localhost:8080/api/auth/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name: username, email, password }),
        });
        const data = await response.json();
        if (response.ok) {
          // Handle successful signup (e.g., show message, switch to login)
          alert("Signup successful! Please log in.");
          setLogin(true);
        } else {
          // Handle signup error
          alert(data.message || "Signup failed");
        }
      } catch (error) {
        alert("Network error: " + error.message);
      }
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
                value={username}
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
