import React from "react";
import { Gear, PersonCircle } from "react-bootstrap-icons";
import Login from "./Login";
import "./Header.css";

const Header = () => {
  const [showLogin, setShowLogin] = React.useState(false);

  return (
    <>
      <header className="header">
        <div className="header-left">
          <span className="header-logo" />
          <span className="header-title">SmartStudy AI</span>
        </div>
        <div className="header-right">
          <button className="header-btn" title="Settings">
            <Gear size={20} />
          </button>
          <button className="header-btn" title="Profile" onClick={() => setShowLogin(!showLogin)}>
            <PersonCircle size={28} />
          </button>
        </div>
      </header>
      
      {showLogin && (
        <div className="Login-overlay">
          <Login />
          <button className="close-btn" onClick={() => setShowLogin(false)}>
            X
          </button>
        </div>
      )}
    </>
  );
};

export default Header;
