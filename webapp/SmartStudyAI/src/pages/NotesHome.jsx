import { useState } from "react";
import { useNavigate } from "react-router-dom";
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

function NotesHome({ subjects, setSubjects }) {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [newSubject, setNewSubject] = useState({
    subject: "",
    colorIdx: 0,
  });

  const handleSaveSubject = () => {
    if (!newSubject.subject.trim()) return;

    const subject = {
      id: Date.now(),
      subject: newSubject.subject,
      colorIdx: newSubject.colorIdx,
      createdAt: new Date().toLocaleDateString(),
      topics: [],
    };

    setSubjects((prev) => [...prev, subject]);
    setNewSubject({ subject: "", colorIdx: 0 });
    setShowModal(false);
  };

  return (
    <div className="notes-main">
      <h1>Subjects</h1>
      <button className="upload-btn" onClick={() => setShowModal(true)}>
        ➕ Add Subject
      </button>

      <div className="notes-list">
        {subjects.length === 0 ? (
          <div className="notes-placeholder">No subjects yet.</div>
        ) : (
          subjects.map((subj) => {
            const { bg, text } = colorPalette[subj.colorIdx];
            return (
              <div
                className="note-card"
                key={subj.id}
                style={{ background: bg, cursor: "pointer" }}
                onClick={() => navigate("/notes", { state: { subject: subj } })}
              >
                <div className="note-title">{subj.subject}</div>
                <div className="note-meta">
                  <span
                    className="note-subject"
                    style={{
                      background: bg,
                      color: text,
                      border: `1px solid ${text}`,
                    }}
                  >
                    {subj.subject}
                  </span>
                  <span className="note-date">{subj.createdAt}</span>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Create Subject</h2>
            <input
              type="text"
              placeholder="Subject name"
              value={newSubject.subject}
              onChange={(e) =>
                setNewSubject({ ...newSubject, subject: e.target.value })
              }
            />
            <select
              value={newSubject.colorIdx}
              onChange={(e) =>
                setNewSubject({
                  ...newSubject,
                  colorIdx: parseInt(e.target.value),
                })
              }
            >
              {colorPalette.map((c, idx) => (
                <option key={idx} value={idx}>
                  Color {idx + 1}
                </option>
              ))}
            </select>
            <div className="modal-actions">
              <button onClick={handleSaveSubject}>Save</button>
              <button onClick={() => setShowModal(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default NotesHome;
