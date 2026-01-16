import { useState } from "react";

function MCQQuiz({ mcqs }) {
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState(null);

  const submit = () => {
    if (selected === mcqs[current].correctAnswer) {
      setScore(score + 1);
    }
    setSelected(null);
    setCurrent(current + 1);
  };

  if (current >= mcqs.length) {
    return (
      <div className="text-center text-xl">
        🎉 Score: {score} / {mcqs.length}
      </div>
    );
  }

  const q = mcqs[current];

  return (
    <div className="space-y-4">
      <h3 className="font-semibold">{q.question}</h3>

      {Object.entries(q.options).map(([key, val]) => (
        <button
          key={key}
          onClick={() => setSelected(key)}
          className={`block w-full p-2 rounded border
            ${selected === key ? "bg-indigo-600 text-white" : ""}`}
        >
          {key}. {val}
        </button>
      ))}

      <button
        onClick={submit}
        className="bg-green-600 text-white px-4 py-2 rounded"
      >
        Submit
      </button>
    </div>
  );
}

export default MCQQuiz;
