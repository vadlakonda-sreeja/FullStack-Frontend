import React, { useState } from "react";

function RecipeGenerator() {

  const [ingredients, setIngredients] = useState("");
  const [cuisine, setCuisine] = useState("");
  const [dietaryRestrictions, setDietaryRestrictions] = useState("");
  const [recipe, setRecipe] = useState("");

  const createRecipe = async () => {

    try {

      const userEmail = localStorage.getItem("user");

      const response = await fetch(
        "http://localhost:8081/generate-recipe",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            userEmail: userEmail,
            ingredients: ingredients,
            cuisine: cuisine,
            diet: dietaryRestrictions
          })
        }
      );

      const data = await response.text();

      console.log(data);

      setRecipe(data);

    } catch (error) {

      console.error("Error creating recipe:", error);

    }

  };

  return (
    <div className="text-center">

      <h2 className="text-4xl font-bold mb-8">
        AI Recipe Generator
      </h2>

      <div className="flex flex-col gap-4 items-center">

        <input
          type="text"
          value={ingredients}
          onChange={(e) => setIngredients(e.target.value)}
          placeholder="Ingredients"
          className="w-[400px] p-4 rounded-2xl bg-white/20 border border-white/20 outline-none"
        />

        <input
          type="text"
          value={cuisine}
          onChange={(e) => setCuisine(e.target.value)}
          placeholder="Cuisine"
          className="w-[400px] p-4 rounded-2xl bg-white/20 border border-white/20 outline-none"
        />

        <input
          type="text"
          value={dietaryRestrictions}
          onChange={(e) => setDietaryRestrictions(e.target.value)}
          placeholder="Dietary Restrictions"
          className="w-[400px] p-4 rounded-2xl bg-white/20 border border-white/20 outline-none"
        />

        <button
          onClick={createRecipe}
          className="bg-pink-500 hover:bg-pink-600 px-8 py-4 rounded-2xl font-bold mt-4 transition"
        >
          Generate Recipe
        </button>

      </div>

      <div
        className="bg-black/30 mt-10 p-8 rounded-3xl text-left leading-8 text-gray-200 shadow-xl overflow-auto"
        dangerouslySetInnerHTML={{ __html: recipe }}
      />

    </div>
  );
}

export default RecipeGenerator;