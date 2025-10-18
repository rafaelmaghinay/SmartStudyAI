import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { notesService } from "../services/notesService";
import "./Notes.css";

const colorPalette = [
  { bg: "#FFF9E5", text: "#E6B800", name: "Yellow" },
  { bg: "#FFE5EC", text: "#D72660", name: "Pink" },
  { bg: "#E5F6FF", text: "#3399CC", name: "Blue" },
  { bg: "#E6FFF5", text: "#22C55E", name: "Green" },
  { bg: "#F3E8FF", text: "#A21CAF", name: "Purple" },
  { bg: "#FFF4E5", text: "#FF8800", name: "Orange" },
  { bg: "#F8E5FF", text: "#C800B6", name: "Magenta" },
  { bg: "#E5FFFF", text: "#009EAF", name: "Cyan" },
];

function NotesHome({ subjects, setSubjects }) {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [newSubject, setNewSubject] = useState({ name: "", color_id: 0 });
  const [loading, setLoading] = useState(false);

  // added by Rafael Maghinay October 2025
  useEffect(() => {
    const fetchSubjects = async () => {
      setLoading(true);
      try {
        const data = await notesService.getSubjects();
        console.log("Subjects from API:", data);

        // Transform API data to match component structure
        const transformedSubjects = data.map((subject, index) => ({
          id: subject.id,
          subject: subject.name,
          colorIdx:
            subject.colorId !== undefined
              ? subject.colorId
              : index % colorPalette.length,
          topics: [],
        }));

        setSubjects(transformedSubjects);
      } catch (error) {
        console.error("Failed to fetch subjects:", error);
        setSubjects(subjects);
      } finally {
        setLoading(false);
      }
    };

    fetchSubjects();
  }, []);

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
        subject: data.subjectName || newSubject.name,
        colorIdx: parseInt(data.colorId, 10) || newSubject.color_id,
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
            const colorIdx = subj.colorIdx !== undefined ? subj.colorIdx : 0;
            const safeColorIdx =
              colorIdx >= 0 && colorIdx < colorPalette.length ? colorIdx : 0;
            const { bg, text, name: colorName } = colorPalette[safeColorIdx];

            return (
              <div
                className="note-card"
                key={subj.id}
                style={{ 
                  background: bg, 
                  cursor: "pointer",
                  border: `2px solid ${text}`,
                  color: text,
                  position: 'relative' // Add this for proper positioning
                }}
                onClick={() => navigate("/notes", { state: { subject: subj } })}
              >
                {/* Main subject name - make it more prominent */}
                <div className="note-title" style={{ 
                  color: text, 
                  fontWeight: 'bold',
                  fontSize: '1.4rem', // Make it larger
                  marginBottom: '12px'
                }}>
                  {subj.subject}
                </div>
                
                <div className="note-meta">
                  <span
                    className="note-subject"
                    style={{
                      background: text,
                      color: bg,
                      border: `1px solid ${text}`,
                      padding: '4px 12px',
                      borderRadius: '12px',
                      fontSize: '13px',
                      fontWeight: '500'
                    }}
                  >
                    {colorName} Theme
                  </span>
                  <span className="note-date" style={{ color: text, fontSize: '0.9rem' }}>
                    {subj.createdAt || 'Recently created'}
                  </span>
                </div>
                
                {/* Color indicator dot */}
                <div 
                  style={{
                    position: 'absolute',
                    top: '10px',
                    right: '10px',
                    width: '20px',
                    height: '20px',
                    borderRadius: '50%',
                    backgroundColor: text,
                    border: `2px solid ${bg}`
                  }}
                ></div>
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
                  {c.name} Theme
                </option>
              ))}
            </select>
            
            {/* Color preview */}
            <div 
              style={{
                width: '100%',
                height: '40px',
                backgroundColor: colorPalette[newSubject.color_id].bg,
                border: `2px solid ${colorPalette[newSubject.color_id].text}`,
                borderRadius: '4px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: colorPalette[newSubject.color_id].text,
                fontWeight: 'bold',
                margin: '10px 0'
              }}
            >
              {newSubject.name || 'Subject Name'} - {colorPalette[newSubject.color_id].name}
            </div>
            
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
