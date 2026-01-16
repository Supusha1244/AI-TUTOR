function FloatingNotesButton({ onOpen }) {
  return (
    <button
      onClick={onOpen}
      className="fixed bottom-6 right-6 bg-indigo-600 text-white p-4 rounded-full shadow-lg hover:bg-indigo-700"
    >
      📒
    </button>
  );
}

export default FloatingNotesButton;
