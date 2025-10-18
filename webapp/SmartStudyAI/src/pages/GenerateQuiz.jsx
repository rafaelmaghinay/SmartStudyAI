import React, { useState } from "react";
import { quizService } from "../services/quizService";
import "./Quizzes.css";

function GenerateQuiz({ userId }) {
  const [notesId, setNotesId] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleGenerate = async () => {
    if (!notesId.trim()) {
      alert("⚠️ Please provide a Notes ID");
      return;
    }

    setLoading(true);
    try {
      const quiz = await quizService.generateQuiz(notesId);
      setMessage(`✅ Quiz generated with ID: ${quiz.id || "unknown"}`);
    } catch (err) {
      console.error("❌ Error generating quiz:", err);
      setMessage("❌ Failed to generate quiz");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="quiz-main">
      <div className="quiz-card">
        <h2 className="quiz-question">Generate a Quiz</h2>
        <input
          type="text"
          placeholder="Enter Notes ID"
          value={notesId}
          onChange={(e) => setNotesId(e.target.value)}
          style={{
            padding: "10px",
            border: "1px solid #ccc",
            borderRadius: "8px",
            width: "100%",
            marginBottom: "20px",
          }}
        />
        <button
          className="quiz-option"
          onClick={handleGenerate}
          disabled={loading}
        >
          {loading ? "Generating..." : "Generate Quiz"}
        </button>
        {message && <p style={{ marginTop: "20px" }}>{message}</p>}
      </div>
    </div>
  );
}

export default GenerateQuiz;
