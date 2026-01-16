import { useState } from "react";

function MCQQuizModal({ mcqs, onClose }) {
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleSelect = (qIndex, optIndex) => {
    setAnswers({ ...answers, [qIndex]: optIndex });
  };

  const score = mcqs.reduce((acc, q, i) => {
    return acc + (answers[i] === q.correctAnswer ? 1 : 0);
  }, 0);

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <div className="bg-[#1f2937] text-white w-full max-w-2xl rounded-xl p-6 relative">

        {/* ❌ Close */}
        <button
          onClick={onClose}
          className="absolute top-3 right-4 text-gray-400 hover:text-white"
        >
          ✖
        </button>

        <h2 className="text-xl font-semibold mb-6">🧠 MCQ Quiz</h2>

        <div className="space-y-6 max-h-[60vh] overflow-y-auto pr-2">
          {mcqs.map((q, i) => (
            <div key={i}>
              <p className="font-medium mb-2">
                {i + 1}. {q.question}
              </p>

              <div className="space-y-2">
                {q.options.map((opt, idx) => {
                  const isCorrect =
                    submitted && idx === q.correctAnswer;
                  const isWrong =
                    submitted &&
                    answers[i] === idx &&
                    idx !== q.correctAnswer;

                  return (
                    <label
                      key={idx}
                      className={`block px-3 py-2 rounded cursor-pointer border
                        ${isCorrect ? "bg-green-600" : ""}
                        ${isWrong ? "bg-red-600" : ""}
                        ${!submitted ? "hover:bg-gray-700" : ""}
                      `}
                    >
                      <input
                        type="radio"
                        name={`q-${i}`}
                        disabled={submitted}
                        onChange={() => handleSelect(i, idx)}
                        className="mr-2"
                      />
                      {opt}
                    </label>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 flex justify-between items-center">
          {submitted && (
            <p className="font-semibold">
              ✅ Score: {score} / {mcqs.length}
            </p>
          )}

          {!submitted && (
            <button
              onClick={() => setSubmitted(true)}
              className="bg-indigo-600 px-4 py-2 rounded hover:bg-indigo-700"
            >
              Submit Quiz
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default MCQQuizModal;
