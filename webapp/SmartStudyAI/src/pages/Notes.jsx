import { useLocation, useNavigate } from "react-router-dom";
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

  if (!subjectFromNav) return <div>No subject selected.</div>;

  const subject = subjects.find((s) => s.id === subjectFromNav.id);
  if (!subject) return <div>Subject not found.</div>;

  // ✅ Create a new topic with placeholder values
  const handleAddTopic = () => {
    const newTopic = {
      id: Date.now(),
      topic: "Untitled Topic",
      createdAt: new Date().toLocaleDateString(),
      content: "",
    };

    // Go to editor with this topic
    navigate("/noteseditor", {
      state: { subject, note: newTopic, isNew: true },
    });
  };

  const handleEdit = (topic) => {
    navigate("/noteseditor", { state: { subject, note: topic } });
  };

  const { bg, text } = colorPalette[subject.colorIdx];

  return (
    <div className="notes-main">
      <h1>{subject.subject} – Topics</h1>
      <button className="upload-btn" onClick={handleAddTopic}>
        ➕ Add Topic
      </button>

      <div className="notes-list">
        {subject.topics.length === 0 ? (
          <div className="notes-placeholder">No topics yet.</div>
        ) : (
          subject.topics.map((topic) => (
            <div
              className="note-card"
              key={topic.id}
              style={{ background: bg, cursor: "pointer" }}
              onClick={() => handleEdit(topic)}
            >
              <div className="note-title">{topic.topic}</div>
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
                  {topic.topic}
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
