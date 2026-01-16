import ReactMarkdown from "react-markdown";

function ChatMessage({ text, sender }) {
  return (
    <div
      className={`max-w-[75%] px-4 py-2 rounded-lg text-sm leading-relaxed
        ${
          sender === "user"
            ? "ml-auto bg-blue-500 text-white"
            : "mr-auto bg-gray-200 text-gray-800"
        }`}
    >
      <ReactMarkdown>{text}</ReactMarkdown>
    </div>
  );
}

export default ChatMessage;
