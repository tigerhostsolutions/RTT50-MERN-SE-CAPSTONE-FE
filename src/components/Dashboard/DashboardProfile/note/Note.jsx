import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Notes = ({ userId }) => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState('');
  const [editNote, setEditNote] = useState(null);

  // Fetch notes for the user
  const fetchNotes = async () => {
    try {
      const response = await axios.get(`/api/members/notes/${userId}`);
      setNotes(response.data);
    } catch (error) {
      console.error('Error fetching notes:', error);
    }
  };

  // Create a new note
  const createNote = async () => {
    try {
      if (!newNote.trim()) return;
      const response = await axios.post('/api/members/notes', { content: newNote, userId });
      setNotes([...notes, response.data]);
      setNewNote('');
    } catch (error) {
      console.error('Error creating note:', error);
    }
  };

  // Update an existing note
  const updateNote = async (id, content) => {
    try {
      const response = await axios.put(`/api/members/notes/${id}`, { content });
      setNotes(notes.map((note) => (note._id === id ? response.data : note)));
      setEditNote(null);
    } catch (error) {
      console.error('Error updating note:', error);
    }
  };

  // Delete a note
  const deleteNote = async (id) => {
    try {
      await axios.delete(`/api/members/notes/${id}`);
      setNotes(notes.filter((note) => note._id !== id));
    } catch (error) {
      console.error('Error deleting note:', error);
    }
  };

  // Fetch notes on component mount
  useEffect(() => {
    fetchNotes();
  }, []);

  return (
      <div>
        <h2>Notes</h2>
        {/* List Notes */}
        {notes.map((note) => (
            <div key={note._id} style={{ marginBottom: '10px' }}>
              {editNote && editNote._id === note._id ? (
                  <>
                    <input
                        type="text"
                        value={editNote.content}
                        onChange={(e) => setEditNote({ ...editNote, content: e.target.value })}
                    />
                    <button onClick={() => updateNote(note._id, editNote.content)}>Save</button>
                    <button onClick={() => setEditNote(null)}>Cancel</button>
                  </>
              ) : (
                   <>
                     <p>{note.content}</p>
                     <button onClick={() => setEditNote(note)}>Edit</button>
                     <button onClick={() => deleteNote(note._id)}>Delete</button>
                   </>
               )}
            </div>
        ))}

        {/* Create New Note */}
        <input
            type="text"
            value={newNote}
            onChange={(e) => setNewNote(e.target.value)}
            placeholder="New Note"
        />
        <button onClick={createNote}>Add Note</button>
      </div>
  );
};

export default Notes;