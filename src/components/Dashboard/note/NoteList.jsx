import React, { useState } from 'react';

const NoteList = ({ notes, onEditNote, onDeleteNote }) => {
  const [editingId, setEditingId] = useState(null); // Tracks the note being edited
  const [editContent, setEditContent] = useState(''); // Tracks edited content

  const startEditing = (note) => {
    setEditingId(note._id);
    setEditContent(note.content);
  };

  const stopEditing = () => {
    setEditingId(null);
    setEditContent('');
  };

  const handleUpdate = () => {
    if (editContent.trim()) {
      onEditNote(editingId, editContent); // Call updateNote in NotesDashboard
      stopEditing();
    }
  };

  return (
      <div>
        <h3>Your Notes</h3>
        {notes.length > 0 ? (
            <ul>
              {notes.map((note) => (
                  <li key={note._id}>
                    {editingId === note._id ? (
                        <div>
                  <textarea
                      value={editContent}
                      onChange={(e) => setEditContent(e.target.value)}
                  />
                          <button onClick={handleUpdate}>Save</button>
                          <button onClick={stopEditing}>Cancel</button>
                        </div>
                    ) : (
                         <div>
                           <span>{note.content}</span>
                           <button onClick={() => startEditing(note)}>Edit</button>
                           <button onClick={() => onDeleteNote(note._id)}>Delete</button>
                         </div>
                     )}
                  </li>
              ))}
            </ul>
        ) : (
             <p>No notes available. Add some!</p>
         )}
      </div>
  );
};

export default NoteList;