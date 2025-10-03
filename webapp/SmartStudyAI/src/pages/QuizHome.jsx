import React from "react";
import { useNavigate } from "react-router-dom";
import "./Quizzes.css";

function QuizHome() {
  const navigate = useNavigate();

  return (
    <div className="quiz-main">
      <div className="quiz-card" style={{ textAlign: "center" }}>
        <h2 className="quiz-question">Welcome to Quizzes 🎯</h2>
        <p style={{ marginBottom: "24px", fontSize: "1.05rem", color: "#444" }}>
          Choose what you’d like to do:
        </p>
        <div className="quiz-options">
          <button
            className="quiz-option"
            onClick={() => navigate("/generatequiz")}
          >
            ➕ Generate a Quiz
          </button>
          <button className="quiz-option" onClick={() => navigate("/quizzes")}>
            📝 Take a Quiz
          </button>
        </div>
      </div>
    </div>
  );
}

export default QuizHome;
