import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { MdOutlineDriveFolderUpload } from "react-icons/md";

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
  const [files, setFiles] = useState([]);

  const handleSave = () => {
    if (!topic.trim()) return;

    const topicData = {
      id: note?.id || Date.now(),
      topic,
      content,
      createdAt: note?.createdAt || new Date().toLocaleDateString(),
      attachments: files, // ✅ include uploaded files
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

  // ✅ Handle file uploads
  const handleUpload = (event) => {
    const newFiles = Array.from(event.target.files);
    setFiles((prev) => [...prev, ...newFiles]);
  };

  const removeFile = (fileName) => {
    setFiles((prev) => prev.filter((f) => f.name !== fileName));
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

      {/* ✅ Upload Section */}
      <div className="upload-section">
        <div className="upload-box">
          <MdOutlineDriveFolderUpload className="upload-icon" />
          <p>Attach Files / Images</p>
          <input
            type="file"
            multiple
            onChange={handleUpload}
            style={{ marginTop: "8px" }}
          />
        </div>

        {/* ✅ Preview uploaded files */}
        {files.length > 0 && (
          <ul className="file-list">
            {files.map((file) => (
              <li key={file.name}>
                {file.name}{" "}
                <button
                  className="remove-file-btn"
                  onClick={() => removeFile(file.name)}
                >
                  ❌
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Actions */}
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
