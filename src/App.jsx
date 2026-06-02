import React, { useState } from "react";
import "./App.css";

import Login from "./components/Login";
import Signup from "./components/Signup";

import ImageGenerator from "./components/ImageGenerator";
import ChatComponent from "./components/ChatComponent";
import RecipeGenerator from "./components/RecipeGenerator";
import History from "./components/History";

function App() {

  const [loggedIn, setLoggedIn] = useState(
    localStorage.getItem("user") ? true : false
  );

  const [isLogin, setIsLogin] = useState(true);

  const [activeTab, setActiveTab] = useState("image-generator");

  const logout = () => {

    localStorage.removeItem("user");

    setLoggedIn(false);
  };

  // LOGIN / SIGNUP SCREEN
  if (!loggedIn) {

    return isLogin ? (

      <Login
        setLoggedIn={setLoggedIn}
        setIsLogin={setIsLogin}
      />

    ) : (

      <Signup
        setIsLogin={setIsLogin}
      />

    );
  }

  // MAIN APP
  return (

    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white p-6">

      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="flex justify-between items-center mb-10 flex-wrap gap-4">

          <div>

            <h1 className="text-5xl font-bold mb-3">
              Pixora AI Suite
            </h1>

            <p className="text-gray-300 text-lg">
              AI Image Generator • AI Chat • AI Recipe Generator
            </p>

          </div>

          <button
            onClick={logout}
            className="bg-red-500 hover:bg-red-600 px-6 py-3 rounded-2xl font-bold shadow-lg transition"
          >
            Logout
          </button>

        </div>

        {/* Tabs */}
        <div className="flex justify-center gap-4 mb-10 flex-wrap">

          <button
            onClick={() => setActiveTab("image-generator")}
            className={`px-6 py-3 rounded-2xl font-semibold transition duration-300 shadow-lg
            ${activeTab === "image-generator"
                ? "bg-blue-500 scale-105"
                : "bg-white/10 hover:bg-white/20"
              }`}
          >
            Image Generator
          </button>

          <button
            onClick={() => setActiveTab("chat")}
            className={`px-6 py-3 rounded-2xl font-semibold transition duration-300 shadow-lg
            ${activeTab === "chat"
                ? "bg-purple-500 scale-105"
                : "bg-white/10 hover:bg-white/20"
              }`}
          >
            AI Chat
          </button>

          <button
            onClick={() => setActiveTab("recipe-generator")}
            className={`px-6 py-3 rounded-2xl font-semibold transition duration-300 shadow-lg
            ${activeTab === "recipe-generator"
                ? "bg-pink-500 scale-105"
                : "bg-white/10 hover:bg-white/20"
              }`}
          >
            Recipe Generator
          </button>
          <button
            onClick={() => setActiveTab("history")}
            className={`px-6 py-3 rounded-2xl font-semibold transition duration-300 shadow-lg
  ${activeTab === "history"
                ? "bg-green-500 scale-105"
                : "bg-white/10 hover:bg-white/20"
              }`}
          >
            History
          </button>

        </div>

        {/* Content */}
        <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white/20">

          {activeTab === "image-generator" && <ImageGenerator />}

          {activeTab === "chat" && <ChatComponent />}

          {activeTab === "recipe-generator" && <RecipeGenerator />}
          {activeTab === "history" && <History />}


        </div>

      </div>

    </div>
  );
}

export default App;