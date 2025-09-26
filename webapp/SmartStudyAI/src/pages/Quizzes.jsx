import React, { useState } from "react";
import "./Quizzes.css";

// Dummy questions for demonstration
const dummyQuestions = Array.from({ length: 15 }, (_, i) => ({
  id: i + 1,
  question: `Sample Question ${i + 1}?`,
  options: {
    a: "Option A",
    b: "Option B",
    c: "Option C",
    d: "Option D",
  },
  answer: "a", // correct answer (for future API use)
}));

function Quizzes() {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState({});
  const questions = dummyQuestions; // Replace with API data in future

  const handleOption = (qid, opt) => {
    setSelected({ ...selected, [qid]: opt });
  };

  const handleNext = () => {
    if (current < questions.length - 1) setCurrent(current + 1);
  };

  const handlePrev = () => {
    if (current > 0) setCurrent(current - 1);
  };

  return (
    <div className="quiz-main">
      <div className="quiz-card">
        <div className="quiz-question">
          <span>
            Q{questions[current].id}. {questions[current].question}
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
          <button
            onClick={handleNext}
            disabled={current === questions.length - 1}
          >
            Next
          </button>
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

export default Quizzes;
