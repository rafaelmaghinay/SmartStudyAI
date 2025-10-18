import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import notesService from "../services/notesService";
import "./Notes.css";

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

function Notes({ subjects }) {
  const navigate = useNavigate();
  const { state } = useLocation();
  const subjectFromNav = state?.subject;
  const [notes, setNotes] = useState([]);
  const [apiSubjects, setApiSubjects] = useState([]); // New state for API subjects
  const [loading, setLoading] = useState(false);


  // Fetch notes for selected subject
  useEffect(() => {
    if (!subjectFromNav) return;

    const fetchNotes = async () => {
      try {
        const data = await notesService.getNotesBySubject(subjectFromNav.id);
        console.log("Notes from API:", data);
        setNotes(data);
      } catch (error) {
        console.error("Failed to fetch notes:", error);
        // Fallback to local data
        const subject = apiSubjects.find((s) => s.id === subjectFromNav.id);
        if (subject) {
          setNotes(subject.topics || []);
        }
      }
    };

    fetchNotes();
  }, [subjectFromNav, apiSubjects]);

  if (!subjectFromNav) {
    // Show all subjects from API if no specific subject selected
    if (loading) return <div>Loading subjects...</div>;

    return (
      <div className="notes-main">
        <h1>My Subjects</h1>
        <div className="subjects-grid">
          {apiSubjects.map((subject) => {
            const { bg, text } = colorPalette[subject.colorIdx];
            return (
              <div
                key={subject.id}
                className="subject-card"
                style={{
                  backgroundColor: bg,
                  color: text,
                  cursor: "pointer",
                }}
                onClick={() => navigate("/notes", { state: { subject } })}
              >
                <h3>{subject.subject}</h3>
                <p>{subject.topics?.length || 0} topics</p>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  // Find subject from API data instead of props
  const subject =
    apiSubjects.find((s) => s.id === subjectFromNav.id) || subjectFromNav;

  const handleAddTopic = () => {
    const newTopic = {
      id: Date.now(),
      topic: "Untitled Topic",
      createdAt: new Date().toLocaleDateString(),
      content: "",
    };

    navigate("/noteseditor", {
      state: { subject, note: newTopic, isNew: true },
    });
  };

  const handleEdit = (topic) => {
    navigate("/noteseditor", { state: { subject, note: topic } });
  };

  const { bg, text } = colorPalette[subject.colorIdx || 0];

  if (loading) return <div>Loading...</div>;

  return (
    <div className="notes-main">
      <h1>{subject.subject} – Topics</h1>
      <button className="upload-btn" onClick={handleAddTopic}>
        ➕ Add Topic
      </button>

      <div className="notes-list">
        {notes.length === 0 ? (
          <div className="notes-placeholder">No topics yet.</div>
        ) : (
          notes.map((topic) => (
            <div
              className="note-card"
              key={topic.id}
              style={{ background: bg, cursor: "pointer" }}
              onClick={() => handleEdit(topic)}
            >
              <div className="note-title">{topic.topic || topic.title}</div>
              <div className="note-meta">
                <span
                  className="note-subject"
                  style={{
                    background: bg,
                    color: text,
                    border: `1px solid ${text}`,
                  }}
                >
                  {subject.subject}
                </span>
                <span className="note-topic" style={{ marginLeft: 2 }}>
                  {topic.topic || topic.title}
                </span>
                <span className="note-date">{topic.createdAt}</span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Notes;
