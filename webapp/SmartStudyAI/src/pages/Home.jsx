import { useNavigate } from "react-router-dom";
import { FaBookOpen, FaClipboardList, FaChartBar } from "react-icons/fa";
import "./Home.css";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-main">
      <h1 className="welcome-message">Welcome to SmartStudy AI!</h1>

      <div className="home-cards">
        <div
          className="home-card notes clickable"
          onClick={() => navigate("/notes")}
          tabIndex={0}
          role="button"
          aria-label="Go to Notes"
        >
          <FaBookOpen className="card-icon" style={{ color: "#2563eb" }} />
          <h2>My Notes</h2>
          <p>View and manage your study notes</p>
        </div>
        <div
          className="home-card quiz clickable"
          onClick={() => navigate("/quizzes")}
          tabIndex={0}
          role="button"
          aria-label="Go to Quizzes"
        >
          <FaClipboardList className="card-icon" style={{ color: "#22c55e" }} />
          <h2>Generate Quiz</h2>
          <p>Create quizzes from your notes</p>
        </div>
        <div
          className="home-card stats clickable"
          onClick={() => navigate("/stats")}
          tabIndex={0}
          role="button"
          aria-label="Go to Statistics"
        >
          <FaChartBar className="card-icon" style={{ color: "#a21caf" }} />
          <h2>Statistics</h2>
          <p>Track your learning progress</p>
        </div>
      </div>
      <div className="home-stats-bar">
        <span>
          Last Score: <span className="score">85%</span>
        </span>
        <span className="divider">|</span>
        <span>
          <span
            role="img"
            aria-label="streak"
            style={{ color: "#f97316", fontSize: "1.2em" }}
          >
            🔥
          </span>
          Streak: <span className="streak">4 days</span>
        </span>
      </div>
    </div>
  );
}

export default Home;
