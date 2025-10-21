import React from "react";
import { Gear, PersonCircle } from "react-bootstrap-icons";
import Login from "./Login";
import "./Header.css";
import { useAuth } from "../services/AuthContext.jsx";

const Header = () => {
  // Use authentication context
  const { loggedIn, login, logout } = useAuth();
  const [showLoginModal, setShowLoginModal] = React.useState(false);

  // Called after successful login
  const handleLoginSuccess = () => {
    login();
    setShowLoginModal(false);
  };

  return (
    <>
      <header className="header">
        <div className="header-left">
          <img
            src="/src/components/SmartStudyLogo.png"
            alt="SmartStudy AI Logo"
            className="header-logo"
          />
          <span className="header-title">SmartStudy AI</span>
        </div>
        <div className="header-right">
          <button className="header-btn" title="Settings">
            <Gear size={20} />
          </button>
          {loggedIn ? (
            <>
              <button className="header-btn" title="Profile">
                <PersonCircle size={28} />
              </button>
              <button className="header-btn" title="Logout" onClick={logout}>
                Logout
              </button>
            </>
          ) : (
            <button
              className="header-btn"
              title="Login"
              onClick={() => setShowLoginModal(true)}
            >
              <span
                style={{
                  display: "inline-block",
                  borderRadius: "12px",
                  background: "#f0f0f0",
                  padding: "4px 16px",
                  fontWeight: "bold",
                  fontSize: "16px",
                  border: "1px solid #ccc",
                  color: "#333",
                  minWidth: "60px",
                  textAlign: "center",
                }}
              >
                Login
              </span>
            </button>
          )}
        </div>
      </header>

      {showLoginModal && !loggedIn && (
        <div className="Login-overlay">
          <Login onLoginSuccess={handleLoginSuccess} />
          <button
            className="close-btn"
            onClick={() => setShowLoginModal(false)}
          >
            X
          </button>
        </div>
      )}
    </>
  );
};

export default Header;
