import { useState } from "react";
import ReactMarkdown from "react-markdown";
import MCQQuizModal from "./MCQQuizModal";

function NotesEditor({ note, setNotes }) {
  const [showQuiz, setShowQuiz] = useState(false);

  // 🔹 Update title
  const updateTitle = (e) => {
    setNotes(prev =>
      prev.map(n =>
        n.id === note.id ? { ...n, title: e.target.value } : n
      )
    );
  };

  // 🔹 Delete note
  const deleteNote = () => {
    setNotes(prev => prev.filter(n => n.id !== note.id));
    window.history.back();
  };

  // 🔹 Toggle favourite
  const toggleFavourite = () => {
    setNotes(prev =>
      prev.map(n =>
        n.id === note.id ? { ...n, favourite: !n.favourite } : n
      )
    );
  };

  // 🔹 Generate MCQs + open popup
  const generateMCQs = async () => {
    const content = note.questions
      .map(q => q.question + "\n" + q.answer)
      .join("\n\n");

    const res = await fetch("http://localhost:4000/mcq/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content }),
    });

    const data = await res.json();

    setNotes(prev =>
      prev.map(n =>
        n.id === note.id ? { ...n, mcqs: data.mcqs } : n
      )
    );

    setShowQuiz(true);
  };

  return (
    <>
      <div className="h-screen bg-[#0b1220] text-white relative">

        {/* 🔹 SCROLLABLE CONTENT */}
        <div className="h-full overflow-y-auto pb-28 px-6 pt-6">
          <div className="max-w-3xl mx-auto bg-[#1f2937] p-6 rounded-xl">

            {/* 📝 TITLE */}
            <input
              value={note.title}
              onChange={updateTitle}
              placeholder="Untitled Note"
              className="w-full text-xl bg-transparent border-b border-gray-500 mb-8 outline-none"
            />

            {/* 📚 QUESTIONS */}
            {note.questions.map((q, i) => (
              <div key={i} className="mb-10">
                <p className="font-semibold mb-2 text-indigo-300">
                  Q{i + 1}. {q.question}
                </p>

                <div className="prose prose-invert max-w-none">
                  <ReactMarkdown>{q.answer}</ReactMarkdown>
                </div>
              </div>
            ))}

          </div>
        </div>

        {/* 🔹 FIXED ACTION BAR */}
        <div className="fixed bottom-0 left-0 w-full bg-[#111827] border-t border-gray-700 z-50">
          <div className="max-w-3xl mx-auto px-6 py-4 flex justify-between items-center">

            <div className="flex gap-6">
              <button
                onClick={deleteNote}
                className="text-red-400 hover:text-red-500"
              >
                🗑 Delete
              </button>

              <button
                onClick={toggleFavourite}
                className="text-yellow-400 hover:text-yellow-500"
              >
                ⭐ Favourite
              </button>
            </div>

            <button
              onClick={generateMCQs}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm"
            >
              🧠 Generate MCQs
            </button>

          </div>
        </div>
      </div>

      {/* 🧠 MCQ POPUP */}
      {showQuiz && note.mcqs && (
        <MCQQuizModal
          mcqs={note.mcqs}
          onClose={() => setShowQuiz(false)}
        />
      )}
    </>
  );
}

export default NotesEditor;
