import React from "react";
import { Gear, PersonCircle } from "react-bootstrap-icons";
import "./Header.css";

const Header = () => {
  return (
    <header className="header">
      <div className="header-left">
        <span className="header-logo" />
        <span className="header-title">SmartStudy AI</span>
      </div>
      <div className="header-right">
        <button className="header-btn" title="Settings">
          <Gear size={20} />
        </button>
        <button className="header-btn" title="Profile">
          <PersonCircle size={28} />
        </button>
      </div>
    </header>
  );
};

export default Header;
