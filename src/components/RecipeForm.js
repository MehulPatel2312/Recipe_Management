import React, { useState } from "react";
import axios from "axios";
import "./RecipeForm.css";

const RecipeForm = ({ onRecipeAdded }) => {
  // Declare state variables for each input field
  const [name, setName] = useState(""); // For recipe name
  const [ingredients, setIngredients] = useState(""); // For ingredients
  const [instructions, setInstructions] = useState(""); // For recipe instructions
  const [category, setCategory] = useState(""); // For category (e.g., Dessert, Main Dish)

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    // Initialize an empty object to store the recipe data
    const recipeData = {};

    // Assign values from the state variables to the recipeData object
    recipeData.name = name; // Assign the name of the recipe
    recipeData.ingredients = ingredients.split(","); // Split the ingredients by commas into an array
    recipeData.instructions = instructions; // Instructions for the recipe
    recipeData.category = category; // Category of the recipe

    // Try to send the recipe data to the backend API
    try {
      const response = await axios.post(
        "http://localhost:5000/api/recipes", // API endpoint to add a new recipe
        recipeData // Send the recipe data as the request body
      );

      // Once the recipe is successfully added, invoke the callback function passed in props
      onRecipeAdded(response.data); // Pass the added recipe data to the parent component

      // Reset the form fields after submission
      setName(""); // Clear the name field
      setIngredients(""); // Clear the ingredients field
      setInstructions(""); // Clear the instructions field
      setCategory(""); // Clear the category field
    } catch (error) {
      // If there is an error during the request, log the error
      console.error("Error adding recipe:", error);
    }
  };

  return (
    <div className="recipe-form">
      <h2>Add New Recipe</h2> {/* Title of the form */}
      <form onSubmit={handleSubmit}> {/* Form submission handler */}
        {/* Input field for recipe name */}
        <label>Name:</label>
        <input
          type="text"
          value={name} // Controlled input value for name
          onChange={(e) => setName(e.target.value)} // Update the state when the input changes
          required // Mark the field as required
        />

        {/* Input field for ingredients (comma-separated list) */}
        <label>Ingredients (comma separated):</label>
        <input
          type="text"
          value={ingredients} // Controlled input value for ingredients
          onChange={(e) => setIngredients(e.target.value)} // Update the state when the input changes
          required // Mark the field as required
        />

        {/* Textarea for recipe instructions */}
        <label>Instructions:</label>
        <textarea
          value={instructions} // Controlled input value for instructions
          onChange={(e) => setInstructions(e.target.value)} // Update the state when the input changes
          required // Mark the field as required
        />

        {/* Input field for category */}
        <label>Category:</label>
        <input
          type="text"
          value={category} // Controlled input value for category
          onChange={(e) => setCategory(e.target.value)} // Update the state when the input changes
          required // Mark the field as required
        />

        {/* Submit button to add the recipe */}
        <button type="submit">Add Recipe</button>
      </form>
    </div>
  );
};

export default RecipeForm;
