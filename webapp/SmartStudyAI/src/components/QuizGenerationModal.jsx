import React, { useState, useEffect } from 'react';
import './QuizGenerationModal.css';

function QuizGenerationModal({ onClose, onGenerate }) {
  const [selectedSubject, setSelectedSubject] = useState('');
  const [selectedNote, setSelectedNote] = useState('');
  const [subjects, setSubjects] = useState([]);
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchSubjects();
  }, []);

  useEffect(() => {
    if (selectedSubject) {
      fetchNotes(selectedSubject);
    } else {
      setNotes([]);
    }
  }, [selectedSubject]);

  const fetchSubjects = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/subjects/user/me');
      const data = await response.json();
      setSubjects(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching subjects:', error);
      setError('Failed to load subjects');
      setLoading(false);
    }
  };

  const fetchNotes = async (subjectId) => {
    try {
      const response = await fetch(`http://localhost:8080/api/notes/subject/${subjectId}`);
      const data = await response.json();
      setNotes(data);
    } catch (error) {
      console.error('Error fetching notes:', error);
      setError('Failed to load notes');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedSubject && selectedNote) {
      onGenerate(selectedSubject, selectedNote);
    }
  };

  if (loading) {
    return (
      <div className="modal-overlay">
        <div className="modal-content">
          <div className="loading">Loading subjects...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Generate New Quiz</h2>
        {error && <div className="error">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="subject">Subject:</label>
            <select
              id="subject"
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
              required
            >
              <option value="">Select a subject</option>
              {subjects.map((subject) => (
                <option key={subject.id} value={subject.id}>
                  {subject.name}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="note">Note:</label>
            <select
              id="note"
              value={selectedNote}
              onChange={(e) => setSelectedNote(e.target.value)}
              required
              disabled={!selectedSubject}
            >
              <option value="">Select a note</option>
              {notes.map((note) => (
                <option key={note.id} value={note.id}>
                  {note.title}
                </option>
              ))}
            </select>
          </div>

          <div className="modal-actions">
            <button type="button" onClick={onClose} className="cancel-button">
              Cancel
            </button>
            <button
              type="submit"
              className="generate-button"
              disabled={!selectedSubject || !selectedNote}
            >
              Generate Quiz
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default QuizGenerationModal;