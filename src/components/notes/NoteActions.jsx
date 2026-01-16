function NoteActions({ onSummary, onMCQ }) {
  return (
    <div className="flex gap-2 mt-2">
      <button
        onClick={onSummary}
        className="text-xs bg-gray-200 px-2 py-1 rounded"
      >
        Short Summary
      </button>

      <button
        onClick={onMCQ}
        className="text-xs bg-gray-200 px-2 py-1 rounded"
      >
        MCQs
      </button>
    </div>
  );
}

export default NoteActions;
