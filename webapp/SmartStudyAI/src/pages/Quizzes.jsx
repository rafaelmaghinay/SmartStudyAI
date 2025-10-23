import React, { useState, useEffect } from "react";
import { quizService } from "../services/quizService";
import QuizAttempt from "../components/QuizAttempt";
import "./Quizzes.css";

function Quizzes() {
  const [quizzes, setQuizzes] = useState([]);
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [generatingQuiz, setGeneratingQuiz] = useState(false);

  useEffect(() => {
    loadQuizzes();
  }, []);

  const loadQuizzes = async () => {
    try {
      const data = await quizService.getUserQuizzes();
      setQuizzes(data);
      setLoading(false);
    } catch (error) {
      console.error("Error loading quizzes:", error);
      setError("Failed to load quizzes. Please try again later.");
      setLoading(false);
    }
  };

  const handleGenerateQuiz = async (subjectId, notesId) => {
    try {
      setGeneratingQuiz(true);
      const data = await quizService.generate(subjectId, notesId);
      setQuizzes([...quizzes, data]);
      setSelectedQuiz(data.id);
    } catch (error) {
      console.error("Error generating quiz:", error);
      setError("Failed to generate quiz. Please try again later.");
    } finally {
      setGeneratingQuiz(false);
    }
  };

  const handleQuizComplete = () => {
    setSelectedQuiz(null);
    loadQuizzes(); // Refresh the quiz list to show updated scores
  };

  if (loading) {
    return <div className="quiz-main">Loading quizzes...</div>;
  }

  if (error) {
    return <div className="quiz-main error">{error}</div>;
  }

  if (selectedQuiz) {
    return (
      <div className="quiz-main">
        <QuizAttempt quizId={selectedQuiz} onComplete={handleQuizComplete} />
      </div>
    );
  }

  return (
    <div className="quiz-main">
      <div className="quiz-header">
        <h2>My Quizzes</h2>
        <button 
          onClick={() => handleGenerateQuiz(1, 1)} 
          disabled={generatingQuiz}
        >
          {generatingQuiz ? "Generating..." : "Generate New Quiz"}
        </button>
      </div>
      
      <div className="quiz-list">
        {quizzes.length === 0 ? (
          <div className="no-quizzes">
            No quizzes available. Generate your first quiz!
          </div>
        ) : (
          quizzes.map((quiz) => (
            <div key={quiz.id} className="quiz-item">
              <div className="quiz-item-info">
                <h3>{quiz.subject}</h3>
                <p>Created: {new Date(quiz.createdAt).toLocaleDateString()}</p>
                {quiz.score !== undefined && (
                  <p>Score: {quiz.score}%</p>
                )}
              </div>
              <button
                onClick={() => setSelectedQuiz(quiz.id)}
                disabled={quiz.completed}
              >
                {quiz.completed ? "Completed" : "Start Quiz"}
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Quizzes;
