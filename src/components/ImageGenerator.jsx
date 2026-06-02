import React, { useState } from "react";

function ImageGenerator() {

  const [prompt, setPrompt] = useState("");
  const [imageUrls, setImageUrls] = useState([]);

  const generateImage = async () => {

    try {

      const userEmail = localStorage.getItem("user");

      const response = await fetch(
        "http://localhost:8081/generate-images",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            userEmail: userEmail,
            prompt: prompt
          })
        }
      );

      const urls = await response.json();

      console.log(urls);

      setImageUrls(urls);

    } catch (error) {

      console.error("Error generating image:", error);

    }
  };

  return (
    <div className="text-center">

      <h2 className="text-4xl font-bold mb-6">
        AI Image Generator
      </h2>

      <div className="flex gap-4 justify-center mb-8 flex-wrap">

        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Enter image prompt..."
          className="w-[350px] p-4 rounded-2xl bg-white/20 border border-white/20 outline-none"
        />

        <button
          onClick={generateImage}
          className="bg-blue-500 hover:bg-blue-600 px-6 py-4 rounded-2xl font-bold transition"
        >
          Generate
        </button>

      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

        {imageUrls.map((url, index) => (
          <img
            key={index}
            src={url}
            alt="generated"
            className="w-full h-[300px] object-cover rounded-2xl shadow-xl hover:scale-105 transition duration-300"
          />
        ))}

      </div>

    </div>
  );
}

export default ImageGenerator;