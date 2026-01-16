import { useParams, useNavigate } from "react-router-dom";
import NotesEditor from "./NotesEditor";

function NotesPage({ notes, setNotes }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const note = notes.find((n) => n.id === Number(id));

  if (!note) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0b1220] text-white">
        <div>
          <p className="mb-4">❌ Note not found</p>
          <button
            onClick={() => navigate("/")}
            className="bg-indigo-600 px-4 py-2 rounded"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen overflow-y-auto bg-[#0b1220] text-white p-6">
      <button
        onClick={() => navigate("/")}
        className="mb-4 text-sm text-indigo-400 hover:underline"
      >
        ← Back to Chat
      </button>

      <NotesEditor note={note} setNotes={setNotes} />
    </div>
  );
}

export default NotesPage;


