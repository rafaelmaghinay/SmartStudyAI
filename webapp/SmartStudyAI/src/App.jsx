import "./App.css";
import Header from "./components/Header.jsx";
import Sidebar from "./components/Sidebar.jsx";
import Home from "./pages/Home.jsx";
import NotesHome from "./pages/NotesHome.jsx";
import Notes from "./pages/Notes.jsx";
import NotesEditor from "./pages/NotesEditor.jsx";
import Quizzes from "./pages/Quizzes.jsx";
import Stats from "./pages/Stats.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { useState } from "react";

// Softer pastel color palette for backgrounds and text
const colorPalette = [
  { bg: "#FFF9E5", text: "#E6B800" },
  { bg: "#FFE5EC", text: "#D72660" },
  { bg: "#E5F6FF", text: "#3399CC" },
  { bg: "#E6FFF5", text: "#22C55E" },
  { bg: "#F3E8FF", text: "#A21CAF" },
  { bg: "#FFF4E5", text: "#FF8800" },
  { bg: "#F8E5FF", text: "#C800B6" },
  { bg: "#E5FFFF", text: "#009EAF" },
];

function App() {
  // ✅ Subjects now contain topics
  const [subjects, setSubjects] = useState([]);

  const handleSaveTopic = (subjectName, topic) => {
    setSubjects((prev) =>
      prev.map((subj) =>
        subj.subject === subjectName
          ? {
              ...subj,
              topics: topic.id
                ? subj.topics.map((t) => (t.id === topic.id ? topic : t)) // update
                : [...subj.topics, { ...topic, id: Date.now() }], // add new with id
            }
          : subj
      )
    );
  };

  const handleDeleteTopic = (subjectName, id) => {
    setSubjects((prev) =>
      prev.map((subj) =>
        subj.subject === subjectName
          ? { ...subj, topics: subj.topics.filter((t) => t.id !== id) }
          : subj
      )
    );
  };

  return (
    <BrowserRouter>
      <Header />
      <div className="app-layout">
        <Sidebar />
        <div className="main-content">
          <Routes>
            <Route path="/home" element={<Home />} />

            {/* Subjects list */}
            <Route
              path="/noteshome"
              element={
                <NotesHome subjects={subjects} setSubjects={setSubjects} />
              }
            />

            {/* Topics for one subject */}
            <Route path="/notes" element={<Notes subjects={subjects} />} />

            {/* Topic editor */}
            <Route
              path="/noteseditor"
              element={
                <NotesEditor
                  onSave={handleSaveTopic}
                  onDelete={handleDeleteTopic}
                  colorPalette={colorPalette}
                />
              }
            />

            <Route path="/quizzes" element={<Quizzes />} />
            <Route path="/stats" element={<Stats />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
