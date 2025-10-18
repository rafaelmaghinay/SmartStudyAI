import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { notesService } from "../services/notesService";
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
  const [newSubject, setNewSubject] = useState({ name: "", color_id: 0 });
  const [loading, setLoading] = useState(false);

  // 🔑 Fetch subjects of logged-in user
  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const data = await notesService.getSubjects();
        console.log("📥 Subjects from backend:", data);

        if (Array.isArray(data)) {
          const mapped = data.map((subj) => ({
            id: subj.id,
            subject: subj.name,
            colorIdx: parseInt(subj.colorId, 10),
            createdAt: subj.createdAt
              ? new Date(subj.createdAt).toLocaleDateString()
              : new Date().toLocaleDateString(),
            topics: subj.topics || [],
          }));
          setSubjects(mapped);
        } else {
          console.warn("⚠️ Unexpected response format:", data);
        }
      } catch (err) {
        console.error("❌ Failed to fetch subjects:", err);
      }
    };

    fetchSubjects();
  }, [setSubjects]);

  const handleSaveSubject = async () => {
    if (!newSubject.name.trim()) {
      alert("⚠️ Subject name cannot be empty");
      return;
    }

    setLoading(true);
    try {
      const data = await notesService.createSubject(
        newSubject.name,
        newSubject.color_id
      );

      if (!data || !data.id) {
        throw new Error("Invalid response from server");
      }

      const subject = {
        id: data.id,
        subject: data.name,
        colorIdx: parseInt(data.colorId, 10),
        createdAt: new Date().toLocaleDateString(),
        topics: [],
      };

      setSubjects((prev) => [...prev, subject]);
      setNewSubject({ name: "", color_id: 0 });
      setShowModal(false);
    } catch (err) {
      console.error("❌ Error saving subject:", err);
      alert("❌ Failed to save subject: " + err.message);
    } finally {
      setLoading(false);
    }
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
              value={newSubject.name}
              onChange={(e) =>
                setNewSubject({ ...newSubject, name: e.target.value })
              }
            />
            <select
              value={newSubject.color_id}
              onChange={(e) =>
                setNewSubject({
                  ...newSubject,
                  color_id: parseInt(e.target.value, 10),
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
              <button onClick={handleSaveSubject} disabled={loading}>
                {loading ? "Saving..." : "Save"}
              </button>
              <button onClick={() => setShowModal(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default NotesHome;
