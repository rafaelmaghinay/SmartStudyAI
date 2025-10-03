import React from "react";
import {
  FaHome,
  FaBookOpen,
  FaClipboardList,
  FaChartBar,
} from "react-icons/fa";
import { NavLink } from "react-router-dom";
import "./Sidebar.css";

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <nav className="sidebar-nav">
        <ul>
          <NavLink
            to="/home"
            className={({ isActive }) =>
              isActive ? "active sidebar-link" : "sidebar-link"
            }
            end
          >
            <li>
              <FaHome className="sidebar-icon" />
              <span>Home</span>
            </li>
          </NavLink>
          <NavLink
            to="/noteshome"
            className={({ isActive }) =>
              isActive ? "active sidebar-link" : "sidebar-link"
            }
          >
            <li>
              <FaBookOpen className="sidebar-icon" />
              <span>Notes</span>
            </li>
          </NavLink>

          <NavLink
            to="/quizhome"
            className={({ isActive }) =>
              isActive ? "active sidebar-link" : "sidebar-link"
            }
          >
            <li>
              <FaClipboardList className="sidebar-icon" />
              <span>Quizzes</span>
            </li>
          </NavLink>

          <NavLink
            to="/stats"
            className={({ isActive }) =>
              isActive ? "active sidebar-link" : "sidebar-link"
            }
          >
            <li>
              <FaChartBar className="sidebar-icon" />
              <span>Stats</span>
            </li>
          </NavLink>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
