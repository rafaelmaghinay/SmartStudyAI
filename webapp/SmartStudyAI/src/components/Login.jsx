import { useState } from "react";
import "./Login.css"; // Import the new CSS file

export default function Login() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [login, setLogin] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (login) {
      console.log("Email:", email, "Password:", password);
    } else {
      console.log("Username:", username, "Email:", email, "Password:", password, "Confirm Password:", confirmPassword);
    }
    // Sign-in API here, probably using what's in the fetch comment below
    // fetch("/api/login", { method: "POST", body: JSON.stringify({ email, password }) });
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
