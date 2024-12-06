import React, { useState, useEffect } from "react";

const Welcome = ({ user, handleLogout }) => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState({ title: "", content: "" });
  const [isExpanded, setIsExpanded] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const handleAddNote = (e) => {
    e.preventDefault();
    if (newNote.content.trim() || newNote.title.trim()) {
      setNotes([{
        id: Date.now(),
        title: newNote.title,
        content: newNote.content,
        color: 'bg-white',
        pinned: false,
        createdAt: new Date().toLocaleString()
      }, ...notes]);
      setNewNote({ title: "", content: "" });
      setIsExpanded(false);
    }
  };

  const handleDeleteNote = (id) => {
    setNotes(notes.filter(note => note.id !== id));
  };

  const handlePinNote = (id) => {
    setNotes(notes.map(note => 
      note.id === id ? { ...note, pinned: !note.pinned } : note
    ));
  };

  const handleColorChange = (id, color) => {
    setNotes(notes.map(note => 
      note.id === id ? { ...note, color } : note
    ));
  };

  const filteredNotes = notes.filter(note => 
    note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    note.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const pinnedNotes = filteredNotes.filter(note => note.pinned);
  const unpinnedNotes = filteredNotes.filter(note => !note.pinned);

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header with Search */}
        <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-md mb-8 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
             
              <h1 className="text-xl font-semibold text-gray-800">Notes</h1>
            </div>
            <div className="flex-1 max-w-xl mx-8">
              <input
                type="text"
                placeholder="Search notes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              Sign Out
            </button>
          </div>
        </div>

        {/* Note Creation Form */}
        <div className="max-w-2xl mx-auto mb-8">
          <form onSubmit={handleAddNote} className="bg-white rounded-lg shadow-md p-4">
            {isExpanded && (
              <input
                type="text"
                placeholder="Title"
                value={newNote.title}
                onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
                className="w-full px-4 py-2 text-lg font-semibold mb-2 focus:outline-none"
              />
            )}
            <textarea
              placeholder="Take a note..."
              value={newNote.content}
              onChange={(e) => setNewNote({ ...newNote, content: e.target.value })}
              onClick={() => setIsExpanded(true)}
              rows={isExpanded ? 3 : 1}
              className="w-full px-4 py-2 resize-none focus:outline-none"
            />
            {isExpanded && (
              <div className="flex justify-between items-center mt-2">
                <div className="flex space-x-2">
                  {/* Color options */}
                  <button type="button" className="w-6 h-6 rounded-full bg-yellow-200 hover:ring-2 ring-offset-2"/>
                  <button type="button" className="w-6 h-6 rounded-full bg-green-200 hover:ring-2 ring-offset-2"/>
                  <button type="button" className="w-6 h-6 rounded-full bg-blue-200 hover:ring-2 ring-offset-2"/>
                  <button type="button" className="w-6 h-6 rounded-full bg-purple-200 hover:ring-2 ring-offset-2"/>
                </div>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                >
                  Add Note
                </button>
              </div>
            )}
          </form>
        </div>

        {/* Notes Grid */}
        <div className="max-w-6xl mx-auto">
          {pinnedNotes.length > 0 && (
            <div className="mb-8">
              <h2 className="text-sm font-medium text-gray-500 mb-4">PINNED</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {pinnedNotes.map(note => (
                  <NoteCard
                    key={note.id}
                    note={note}
                    onDelete={handleDeleteNote}
                    onPin={handlePinNote}
                    onColorChange={handleColorChange}
                  />
                ))}
              </div>
            </div>
          )}

          {unpinnedNotes.length > 0 && (
            <div>
              {pinnedNotes.length > 0 && (
                <h2 className="text-sm font-medium text-gray-500 mb-4">OTHERS</h2>
              )}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {unpinnedNotes.map(note => (
                  <NoteCard
                    key={note.id}
                    note={note}
                    onDelete={handleDeleteNote}
                    onPin={handlePinNote}
                    onColorChange={handleColorChange}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const NoteCard = ({ note, onDelete, onPin, onColorChange }) => {
  const [showOptions, setShowOptions] = useState(false);
  
  return (
    <div 
      className={`${note.color} rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 relative group`}
      onMouseEnter={() => setShowOptions(true)}
      onMouseLeave={() => setShowOptions(false)}
    >
      <div className="p-4">
        {note.title && (
          <h3 className="text-lg font-semibold mb-2">{note.title}</h3>
        )}
        <p className="text-gray-700 whitespace-pre-wrap">{note.content}</p>
        <p className="text-xs text-gray-500 mt-2">{note.createdAt}</p>
      </div>
      
      {showOptions && (
        <div className="absolute bottom-2 right-2 flex items-center space-x-2 bg-white rounded-lg shadow-md p-1">
          <button
            onClick={() => onPin(note.id)}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            {note.pinned ? "📌" : "📍"}
          </button>
          <button
            onClick={() => onDelete(note.id)}
            className="p-2 hover:bg-gray-100 rounded-full text-red-500"
          >
            🗑️
          </button>
          <div className="relative group">
            <button className="p-2 hover:bg-gray-100 rounded-full">🎨</button>
            <div className="absolute bottom-full right-0 mb-2 hidden group-hover:flex space-x-1 bg-white rounded-lg shadow-md p-1">
              {['bg-white', 'bg-yellow-200', 'bg-green-200', 'bg-blue-200', 'bg-purple-200'].map(color => (
                <button
                  key={color}
                  onClick={() => onColorChange(note.id, color)}
                  className={`w-6 h-6 rounded-full ${color} hover:ring-2 ring-offset-2`}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Welcome;
