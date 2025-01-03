import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import RecipeList from "./components/RecipeList";
import RecipeForm from "./components/RecipeForm";
import RecipeEdit from "./components/RecipeEdit";
import Favorite from "./components/Favorite"; // Import the Favorite component for displaying favorite recipes
import "./App.css"; // Custom styles for the app

const App = () => {
  // State to store all the recipes
  const [recipes, setRecipes] = useState([]);
  
  // State to store favorite recipes
  const [favorites, setFavorites] = useState([]);

  // Function to handle adding a new recipe
  const handleRecipeAdded = (newRecipe) => {
    // Add the new recipe to the existing recipes list
    setRecipes([...recipes, newRecipe]);
  };

  // Function to handle adding a recipe to the favorites list
  const handleFavorite = (recipe) => {
    // Check if the recipe is already in the favorites to avoid duplicates
    if (!favorites.some((fav) => fav._id === recipe._id)) {
      setFavorites([...favorites, recipe]); // Add to favorites if not already present
    }
  };

  return (
    <Router>
      <div className="app-container">
        <h1 className="app-header">Recipe Management</h1>

        {/* Navigation bar */}
        <nav className="navbar">
          <ul>
            <li>
              <Link to="/" className="nav-link">Home</Link> {/* Link to Home (Recipe List) */}
            </li>
            <li>
              <Link to="/add" className="nav-link">Add Recipe</Link> {/* Link to Add New Recipe */}
            </li>
            <li>
              <Link to="/favorites" className="nav-link">Favorites</Link> {/* Link to Favorites Page */}
            </li>
          </ul>
        </nav>

        {/* Defining the Routes */}
        <Routes>
          {/* Home Route: Displays the Recipe List with ability to add to favorites */}
          <Route path="/" element={<RecipeList onFavorite={handleFavorite} />} />
          
          {/* Add Recipe Route: Form for adding new recipes */}
          <Route
            path="/add"
            element={<RecipeForm onRecipeAdded={handleRecipeAdded} />}
          />
          
          {/* Edit Recipe Route: Allows editing of a specific recipe by its ID */}
          <Route path="/edit/:id" element={<RecipeEdit />} />
          
          {/* Favorites Route: Displays favorite recipes */}
          <Route path="/favorites" element={<Favorite favorites={favorites} />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
