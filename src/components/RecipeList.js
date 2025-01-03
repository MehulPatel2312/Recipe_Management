import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import DeleteButton from './DeleteButton';
import './RecipeList.css';

const RecipeList = () => {
  // States to manage the list of recipes, search terms, filters, etc.
  const [recipes, setRecipes] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [sortByDate, setSortByDate] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);

  // Fetch recipes from the backend and load favorite recipes from localStorage
  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        // Get all recipes from the API
        const response = await axios.get('http://localhost:5000/api/recipes');
        setRecipes(response.data);
        setFilteredRecipes(response.data); // Initially set filtered recipes to all recipes
      } catch (error) {
        console.error('Error fetching recipes:', error);
      }
    };

    fetchRecipes();

    // Load favorite recipes from localStorage
    const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavorites(storedFavorites);
  }, []);

  // Effect to filter and sort recipes based on search, category, and date
  useEffect(() => {
    let updatedRecipes = showFavoritesOnly ? favorites : recipes;

    // Filter recipes based on search term
    if (searchTerm) {
      updatedRecipes = updatedRecipes.filter(
        (recipe) =>
          recipe.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          recipe.ingredients.some((ingredient) =>
            ingredient.toLowerCase().includes(searchTerm.toLowerCase())
          )
      );
    }

    // Filter recipes by selected category
    if (filterCategory) {
      updatedRecipes = updatedRecipes.filter(
        (recipe) => recipe.category === filterCategory
      );
    }

    // Sort recipes by date if sortByDate is true
    if (sortByDate) {
      updatedRecipes = [...updatedRecipes].sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
    }

    setFilteredRecipes(updatedRecipes); // Update filtered recipes
  }, [searchTerm, filterCategory, sortByDate, recipes, favorites, showFavoritesOnly]);

  // Handle adding a recipe to favorites
  const handleFavorite = (id) => {
    const favoriteRecipe = recipes.find((recipe) => recipe._id === id);
    if (favoriteRecipe && !favorites.some((fav) => fav._id === id)) {
      const updatedFavorites = [...favorites, favoriteRecipe];
      setFavorites(updatedFavorites);
      localStorage.setItem('favorites', JSON.stringify(updatedFavorites)); // Save to localStorage
      alert(`${favoriteRecipe.name} added to favorites!`);
    } else {
      alert("This recipe is already in favorites!");
    }
  };

  // Handle removing a recipe from favorites
  const handleRemoveFavorite = (id) => {
    const updatedFavorites = favorites.filter((fav) => fav._id !== id);
    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites)); // Update localStorage
  };

  // JSX structure for displaying the recipe list
  return (
    <div className="recipe-list-container">
      <h1 className="recipe-list-title">Recipe List</h1>

      {/* Filters and search options */}
      <div className="filters-container">
        <input
          type="text"
          placeholder="Search recipes..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)} // Update search term
          className="search-bar"
        />

        <select
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)} // Update category filter
          className="category-filter"
        >
          <option value="">All Categories</option>
          {[...new Set(recipes.map((recipe) => recipe.category))].map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>

        {/* Sort by date checkbox */}
        <label className="date-sort">
          <input
            type="checkbox"
            checked={sortByDate}
            onChange={() => setSortByDate(!sortByDate)} // Toggle sort by date
          />
          Sort by Date
        </label>

        {/* Show only favorite recipes checkbox */}
        <label className="favorites-filter">
          <input
            type="checkbox"
            checked={showFavoritesOnly}
            onChange={() => setShowFavoritesOnly(!showFavoritesOnly)} // Toggle show favorites only
          />
          Show Favorites Only
        </label>
      </div>

      {/* Recipe list display */}
      <div className="recipe-list">
        {filteredRecipes.map((recipe) => (
          <div key={recipe._id} className="recipe-card">
            <h3>{recipe.name}</h3>
            <p><strong>Category:</strong> {recipe.category}</p>
            <p className="recipe-ingredients">
              <strong>Ingredients:</strong> {recipe.ingredients.join(', ')}
            </p>
            <p className="recipe-instructions">
              <strong>Instructions:</strong> {recipe.instructions}
            </p>
            <p><strong>Created At:</strong> {new Date(recipe.createdAt).toLocaleDateString()}</p>

            {/* Link to edit the recipe */}
            <Link to={`/edit/${recipe._id}`} className="edit-button">Edit Recipe</Link>

            {/* Add or remove from favorites */}
            {favorites.some((fav) => fav._id === recipe._id) ? (
              <button
                onClick={() => handleRemoveFavorite(recipe._id)}
                className="unfavorite-button"
              >
                Remove from Favorites
              </button>
            ) : (
              <button
                onClick={() => handleFavorite(recipe._id)}
                className="favorite-button"
              >
                Add to Favorites
              </button>
            )}

            {/* Delete button component */}
            <DeleteButton
              recipeId={recipe._id}
              onDelete={() => setRecipes(recipes.filter((r) => r._id !== recipe._id))}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecipeList;
