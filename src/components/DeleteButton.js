// components/DeleteButton.js
import React from "react";
import axios from "axios";

const DeleteButton = ({ recipeId, onDelete }) => {
  // handleDelete function to manage the deletion of a recipe
  const handleDelete = async () => {
    // Ask the user to confirm if they really want to delete the recipe
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this recipe?"
    );

    // If the user cancels, stop the deletion process
    if (!isConfirmed) return;

    try {
      // Log the recipe ID for debugging purposes (remove in production)
      console.log(`Deleting recipe with ID: ${recipeId}`);

      // Make an HTTP DELETE request to the backend to delete the recipe
      await axios.delete(`http://localhost:5000/api/recipes/${recipeId}`);

      // Call the onDelete function passed from the parent component
      // This function is expected to update the parent component's state to reflect the deleted recipe
      onDelete(recipeId); // Pass the recipeId to update the state in the parent

    } catch (error) {
      // If there is an error during the deletion request, show an alert
      console.error("Error deleting recipe:", error);
      alert("There was an error deleting the recipe. Please try again.");
    }
  };

  return (
    // Button that triggers the deletion when clicked
    <button onClick={handleDelete} className="delete-button">
      Delete Recipe
    </button>
  );
};

export default DeleteButton;
