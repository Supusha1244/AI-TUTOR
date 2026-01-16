function NotesDrawer({ isOpen, onClose, notes, onCreateNote, onNoteClick }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-40">
      <div
        className="absolute inset-0 bg-black/40"
        onClick={onClose}
      />

      <div className="absolute right-0 top-0 h-full w-72 bg-[#111827] text-white p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-semibold">📒 My Notes</h2>
          <button onClick={onClose}>✖</button>
        </div>

        {/* ➕ CREATE NOTE */}
        <button
          onClick={() => {
            const id = onCreateNote();
            onNoteClick(id);
            onClose();
          }}
          className="w-full mb-4 bg-indigo-600 py-2 rounded"
        >
          ➕ New Note
        </button>

        {notes.map((note) => (
          <div
            key={note.id}
            onClick={() => {
              onNoteClick(note.id);
              onClose();
            }}
            className="p-2 rounded hover:bg-gray-700 cursor-pointer mb-2"
          >
            {note.title}
          </div>
        ))}
      </div>
    </div>
  );
}

export default NotesDrawer;

