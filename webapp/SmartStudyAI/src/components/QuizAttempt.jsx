import React, { useState, useEffect } from "react";
import { quizService } from "../services/quizService";
import "./QuizAttempt.css";

function QuizAttempt({ quizId, onComplete }) {
  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadQuestions();
  }, [quizId]);

  const loadQuestions = async () => {
    try {
      const data = await quizService.getQuizQuestions(quizId);
      setQuestions(data);
      setLoading(false);
    } catch (error) {
      console.error("Error loading quiz questions:", error);
    }
  };

  const handleOption = (qid, opt) => {
    setSelected({ ...selected, [qid]: opt });
  };

  const handleNext = () => {
    if (current < questions.length - 1) setCurrent(current + 1);
  };

  const handlePrev = () => {
    if (current > 0) setCurrent(current - 1);
  };

  const handleSubmit = async () => {
    try {
      await quizService.submitQuizAnswers(quizId, selected);
      onComplete();
    } catch (error) {
      console.error("Error submitting quiz:", error);
    }
  };

  if (loading) {
    return <div>Loading questions...</div>;
  }

  if (!questions.length) {
    return <div>No questions available.</div>;
  }

  return (
    <div className="quiz-attempt">
      <div className="quiz-card">
        <div className="quiz-question">
          <span>
            Q{current + 1}. {questions[current].question}
          </span>
        </div>
        <div className="quiz-options">
          {Object.entries(questions[current].options).map(([key, val]) => (
            <button
              key={key}
              className={`quiz-option${
                selected[questions[current].id] === key ? " selected" : ""
              }`}
              onClick={() => handleOption(questions[current].id, key)}
            >
              <strong>{key.toUpperCase()}.</strong> {val}
            </button>
          ))}
        </div>
        <div className="quiz-nav">
          <button onClick={handlePrev} disabled={current === 0}>
            Previous
          </button>
          {current === questions.length - 1 ? (
            <button onClick={handleSubmit}>Submit Quiz</button>
          ) : (
            <button onClick={handleNext}>Next</button>
          )}
        </div>
        <div className="quiz-progress">
          Question {current + 1} of {questions.length}
          <div className="quiz-progress-bar">
            <div
              className="quiz-progress-fill"
              style={{
                width: `${((current + 1) / questions.length) * 100}%`,
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default QuizAttempt;