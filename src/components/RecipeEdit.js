import React, { useState, useEffect } from 'react'; // Importing React and necessary hooks
import { useNavigate, useParams } from 'react-router-dom'; // Importing React Router hooks for navigation and params
import axios from 'axios'; // Importing axios for making HTTP requests
import './RecipeEdit.css'; // Importing styles for the RecipeEdit component

const RecipeEdit = () => {
  // State variables to hold form data
  const [name, setName] = useState(''); // Recipe name
  const [ingredients, setIngredients] = useState(''); // Ingredients list (comma-separated)
  const [instructions, setInstructions] = useState(''); // Cooking instructions
  const [category, setCategory] = useState(''); // Recipe category (e.g., dessert, main dish)
  
  // Extracting the recipe ID from URL params to fetch the correct recipe
  const { id } = useParams();
  
  // Navigate function for redirecting after updating the recipe
  const navigate = useNavigate();

  // useEffect hook to fetch the recipe data when the component mounts or when the ID changes
  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        // Making an API request to fetch the recipe based on ID
        const response = await axios.get(`http://localhost:5000/api/recipes/${id}`);
        
        // Extracting the recipe data from the response
        const recipe = response.data;
        
        // Setting the state variables with the fetched data
        setName(recipe.name);
        setIngredients(recipe.ingredients.join(', ')); // Join ingredients array into a comma-separated string
        setInstructions(recipe.instructions);
        setCategory(recipe.category);
      } catch (error) {
        // Handling errors (e.g., if the recipe is not found)
        console.error('Error fetching recipe:', error);
      }
    };

    fetchRecipe(); // Call the function to fetch the recipe
  }, [id]); // Dependency array ensures this effect runs when the recipe ID changes

  // Handle the form submission for updating the recipe
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior

    // Creating an object with the updated recipe data
    const updatedRecipe = {
      name, // Recipe name
      ingredients: ingredients.split(','), // Convert comma-separated string back to array
      instructions, // Instructions
      category, // Category
    };

    try {
      // Making an API request to update the recipe in the database
      await axios.put(`http://localhost:5000/api/recipes/${id}`, updatedRecipe);
      
      // Redirect to the home page after updating the recipe
      navigate('/');
    } catch (error) {
      // Handling errors if the update request fails
      console.error('Error updating recipe:', error);
    }
  };

  return (
    <div className="edit-container">
      <h2 className="edit-title">Edit Recipe</h2>
      <form className="edit-form" onSubmit={handleSubmit}>
        <label>Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)} // Update the state when the input changes
          required // Ensure this field is filled out
        />

        <label>Ingredients (comma separated):</label>
        <input
          type="text"
          value={ingredients}
          onChange={(e) => setIngredients(e.target.value)} // Update ingredients state
          required
        />

        <label>Instructions:</label>
        <textarea
          rows="5" // Set the number of visible rows for the text area
          value={instructions}
          onChange={(e) => setInstructions(e.target.value)} // Update instructions state
          required
        ></textarea>

        <label>Category:</label>
        <input
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)} // Update category state
          required
        />

        <button type="submit">Update Recipe</button> {/* Button to submit the form */}
      </form>
    </div>
  );
};

export default RecipeEdit; // Export the component for use in other parts of the app
