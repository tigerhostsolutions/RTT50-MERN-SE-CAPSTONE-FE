import React, { useState } from 'react';

const NotePosting = ({ onAddNote }) => {
  const [noteContent, setNoteContent] = useState(''); // Input for new note

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddNote(noteContent); // Call addNote in NotesDashboard
    setNoteContent(''); // Clear input after submission
  };

  return (
      <form onSubmit={handleSubmit}>
      <textarea
          value={noteContent}
          onChange={(e) => setNoteContent(e.target.value)}
          placeholder="Write a new note..."
          rows="4"
          cols="50"
      />
        <br />
        <button type="submit" disabled={!noteContent.trim()}>
          Save Note
        </button>
      </form>
  );
};

export default NotePosting;