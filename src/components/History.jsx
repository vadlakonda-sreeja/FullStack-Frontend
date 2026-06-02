import React, { useEffect, useState } from "react";

function History() {

  const [chatHistory, setChatHistory] = useState([]);
  const [imageHistory, setImageHistory] = useState([]);
  const [recipeHistory, setRecipeHistory] = useState([]);

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {

    const userEmail = localStorage.getItem("user");

    // Chat history
    const chatResponse = await fetch(
      `http://localhost:8081/history/${userEmail}`
    );
    const chats = await chatResponse.json();
    setChatHistory(chats);

    // Image history
    const imageResponse = await fetch(
      `http://localhost:8081/image-history/${userEmail}`
    );
    const images = await imageResponse.json();
    setImageHistory(images);

    // Recipe history
    const recipeResponse = await fetch(
      `http://localhost:8081/recipe-history/${userEmail}`
    );
    const recipes = await recipeResponse.json();
    setRecipeHistory(recipes);
  };

  return (
    <div className="text-white mt-10">

      <h2 className="text-4xl font-bold mb-8 text-center">
        Saved History
      </h2>

      {/* Chat History */}
      <div className="mb-10">
        <h3 className="text-2xl font-bold mb-4">Chat History</h3>

        {chatHistory.map((chat) => (
          <div
            key={chat.id}
            className="bg-white/10 p-4 rounded-xl mb-4"
          >
            <p><strong>Question:</strong> {chat.question}</p>
            <p><strong>Answer:</strong> {chat.answer}</p>
          </div>
        ))}
      </div>

      {/* Image History */}
      <div className="mb-10">
        <h3 className="text-2xl font-bold mb-4">Image History</h3>

        <div className="grid grid-cols-4 gap-4">
          {imageHistory.map((img) => (
            <div key={img.id}>
              <p>{img.prompt}</p>
              <img
                src={img.imageUrl}
                alt="saved"
                className="w-full h-[200px] object-cover rounded-xl"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Recipe History */}
      <div>
        <h3 className="text-2xl font-bold mb-4">Recipe History</h3>

        {recipeHistory.map((recipe) => (
          <div
            key={recipe.id}
            className="bg-white/10 p-4 rounded-xl mb-4"
          >
            <p><strong>Ingredients:</strong> {recipe.ingredients}</p>
            <p>{recipe.generatedRecipe}</p>
          </div>
        ))}
      </div>

    </div>
  );
}

export default History;