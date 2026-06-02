import React, { useEffect, useState } from "react";

function ChatComponent() {
  const [prompt, setPrompt] = useState("");
  const [chatResponse, setChatResponse] = useState("");
  const [chatHistory, setChatHistory] = useState([]);

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = async () => {
    try {
      const userEmail = localStorage.getItem("user");

      const response = await fetch(
        `http://localhost:8081/history/${userEmail}`
      );

      const data = await response.json();

      setChatHistory(data);

    } catch (error) {
      console.error(error);
    }
  };

  const askAI = async () => {
    try {
      const userEmail = localStorage.getItem("user");

      const response = await fetch(
        "http://localhost:8081/ask-ai",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            userEmail,
            message: prompt
          })
        }
      );

      const data = await response.text();

      setChatResponse(data);
      setPrompt("");

      loadHistory();

    } catch (error) {
      console.error(error);
    }
  };

  const deleteChat = async (id) => {
    try {
      await fetch(
        `http://localhost:8081/history/${id}`,
        {
          method: "DELETE"
        }
      );

      loadHistory();

    } catch (error) {
      console.error(error);
    }
  };

  const openOldChat = (chat) => {
    setPrompt(chat.question);
    setChatResponse(chat.answer);
  };

  const newChat = () => {
    setPrompt("");
    setChatResponse("");
  };

  return (
    <div className="flex gap-6">

      {/* Sidebar */}
      <div className="w-[300px] bg-black/30 rounded-2xl p-4 h-[600px] overflow-y-auto">

        <button
          onClick={newChat}
          className="w-full bg-green-500 hover:bg-green-600 p-3 rounded-xl font-bold mb-4"
        >
          + New Chat
        </button>

        {chatHistory.map((chat) => (
          <div
            key={chat.id}
            className="bg-white/10 p-3 rounded-xl mb-3"
          >
            <p
              onClick={() => openOldChat(chat)}
              className="cursor-pointer text-sm hover:text-cyan-300"
            >
              {chat.question}
            </p>

            <button
              onClick={() => deleteChat(chat.id)}
              className="mt-2 bg-red-500 hover:bg-red-600 px-3 py-1 rounded-lg text-sm"
            >
              Delete
            </button>
          </div>
        ))}
      </div>

      {/* Chat Area */}
      <div className="flex-1 text-center">

        <h2 className="text-4xl font-bold mb-6">
          AI Chat Assistant
        </h2>

        <div className="flex gap-4 justify-center mb-8 flex-wrap">

          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Ask anything..."
            className="w-[500px] p-4 rounded-2xl bg-white/20 border border-white/20 outline-none"
          />

          <button
            onClick={askAI}
            className="bg-purple-500 hover:bg-purple-600 px-6 py-4 rounded-2xl font-bold"
          >
            Ask AI
          </button>

        </div>

        <div className="bg-black/30 p-6 rounded-2xl text-left leading-8 text-gray-200 shadow-xl min-h-[300px]">
          {chatResponse}
        </div>

      </div>

    </div>
  );
}

export default ChatComponent;