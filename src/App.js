import { useState } from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";

import ChatBox from "./components/chat/ChatBox";
import NotesDrawer from "./components/notes/NotesDrawer";
import FloatingNotesButton from "./components/notes/FloatingNotesButton";
import NotesPage from "./components/notes/NotesPage";

function ChatLayout({ notes, setNotes }) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const navigate = useNavigate();

  const addQuestionToNote = (noteId, data) => {
    setNotes(prev =>
      prev.map(note =>
        note.id === noteId
          ? { ...note, questions: [...note.questions, data] }
          : note
      )
    );
  };

  const createNewNote = (title, firstQuestion) => {
    setNotes(prev => [
      ...prev,
      {
        id: Date.now(),
        title,
        questions: [firstQuestion],
      },
    ]);
  };

  const createEmptyNote = () => {
  const newNote = {
    id: Date.now(),
    title: "Untitled Note",
    questions: [],
    favourite: false,
  };

  setNotes(prev => [...prev, newNote]);
  return newNote.id; // 🔥 return id
};


  return (
    <>
      <ChatBox
        notes={notes}
        onAddToNote={addQuestionToNote}
        onCreateNote={createNewNote}
        openNotes={() => setDrawerOpen(true)}
      />

      <FloatingNotesButton onOpen={() => setDrawerOpen(true)} />

      <NotesDrawer
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        notes={notes}
        onCreateNote={createEmptyNote}
        onNoteClick={(id) => {
          navigate(`/notes/${id}`);
        }}
      />
    </>
  );
}

function App() {
  const [notes, setNotes] = useState([]);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<ChatLayout notes={notes} setNotes={setNotes} />}
        />
        <Route
          path="/notes/:id"
          element={<NotesPage notes={notes} setNotes={setNotes} />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
