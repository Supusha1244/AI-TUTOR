function NoteItem({ note, onFav, onDelete }) {
  return (
    <div className="flex justify-between items-center">
      <span>{note.title}</span>

      <div className="flex gap-2">
        <button onClick={onFav}>
          {note.favourite ? "⭐" : "☆"}
        </button>
        <button onClick={onDelete}>🗑</button>
      </div>
    </div>
  );
}

export default NoteItem;
