import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

function NotesEditor({ onSave, onDelete }) {
  const navigate = useNavigate();
  const location = useLocation();

  // Passed from navigation
  const { subject, note } = location.state || {};

  if (!subject) {
    return <div className="notes-editor-main">⚠️ No subject selected</div>;
  }

  // State for editing/creating a topic
  const [topic, setTopic] = useState(note?.topic || "");
  const [content, setContent] = useState(note?.content || "");

  const handleSave = () => {
    if (!topic.trim()) return;

    const topicData = {
      id: note?.id || Date.now(),
      topic,
      content,
      createdAt: note?.createdAt || new Date().toLocaleDateString(),
    };

    // ✅ Pass subject + topic
    onSave(subject.subject, topicData);

    navigate("/notes", { state: { subject } });
  };

  const handleDelete = () => {
    if (note?.id) {
      // ✅ Pass subject + topic id
      onDelete(subject.subject, note.id);
    }
    navigate("/notes", { state: { subject } });
  };

  return (
    <div className="notes-editor-main">
      <h2>{note ? "Edit Topic" : "Create Topic"}</h2>
      <div className="editor-fields">
        <label>
          Subject:
          <input type="text" value={subject.subject} disabled />
        </label>
        <label>
          Topic:
          <input
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="Enter topic"
          />
        </label>
        <label>
          Notes:
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={8}
            placeholder="Type your notes here..."
          />
        </label>
      </div>

      <div className="editor-actions">
        <button className="save-btn" onClick={handleSave}>
          Save
        </button>
        {note && (
          <button className="delete-btn" onClick={handleDelete}>
            Delete
          </button>
        )}
        <button
          className="back-btn"
          onClick={() => navigate("/notes", { state: { subject } })}
        >
          Go Back
        </button>
      </div>
    </div>
  );
}

export default NotesEditor;
