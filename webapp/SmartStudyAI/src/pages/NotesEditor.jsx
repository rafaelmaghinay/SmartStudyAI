import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { MdOutlineDriveFolderUpload } from "react-icons/md";
import notesService from "../services/notesService";

function NotesEditor() {
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

  const handleSave = async () => {
    if (!topic.trim()) {
      alert("⚠️ Topic name cannot be empty.");
      return;
    }

    try {
      if (note?.id) {
        // Update existing note
        await notesService.updateNote(note.id, topic, content);
      } else {
        // Create a new note
        const userId = localStorage.getItem("userId");
        if (!userId) {
          alert("⚠️ User not logged in.");
          return;
        }
        await notesService.createNote(userId, subject.id, topic, content);
      }

      navigate("/notes", { state: { subject } });
    } catch (err) {
      console.error("❌ Error saving note:", err);
      alert("❌ Failed to save note.");
    }
  };

  const handleDelete = async () => {
    if (!note?.id) {
      alert("⚠️ No note to delete.");
      return;
    }

    if (!window.confirm("Are you sure you want to delete this note?")) {
      return;
    }

    try {
      await notesService.deleteNote(note.id);
      navigate("/notes", { state: { subject } });
    } catch (err) {
      console.error("❌ Error deleting note:", err);
      alert("❌ Failed to delete note.");
    }
  };

  const handleUpload = async (event) => {
    const selectedFiles = Array.from(event.target.files);
    setFiles((prev) => [...prev, ...selectedFiles]);

    if (selectedFiles.length > 0) {
      try {
        // Upload and extract text for the first file
        const result = await notesService.uploadAndExtractText(
          selectedFiles[0],
          subject.id
        );

        if (result?.content) {
          setContent(result.content);
          setTopic(result.title || selectedFiles[0].name);
          alert("✅ Text successfully extracted and added to notes!");
        } else {
          alert("⚠️ No text found in the file.");
        }
      } catch (err) {
        console.error("❌ Error extracting text:", err);
        alert("❌ Failed to extract text from file.");
      }
    }
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
