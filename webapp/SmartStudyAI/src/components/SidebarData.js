import React from "react";
import {
  FaHome,
  FaBookOpen,
  FaClipboardList,
  FaChartBar,
} from "react-icons/fa";

export const SidebarData = [
  {
    title: "Home",
    icon: <FaHome />,
    link: "/pages/Home.jsx"
  },
  {
    title: "Notes",
    icon: <FaBookOpen />,
    link: "/notes"
  },
  {
    title: "Quizzes",
    icon: <FaClipboardList />,
    link: "/quizzes"
  },
  {
    title: "Stats",
    icon: <FaChartBar />,
    link: "/stats"
  }
];