function Button({ children, onClick }) {
  return (
    <button
      onClick={onClick}
      className="px-3 py-1 rounded bg-indigo-600 text-white"
    >
      {children}
    </button>
  );
}

export default Button;
