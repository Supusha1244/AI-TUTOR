function Modal({ open, onClose, children }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
      <div className="bg-white p-4 rounded shadow">
        <button onClick={onClose} className="float-right">
          ❌
        </button>
        {children}
      </div>
    </div>
  );
}

export default Modal;
