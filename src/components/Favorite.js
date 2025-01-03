import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './RecipeList.css';

const Favorite = () => {
  // State variables for managing recipes, filters, and sorting
  const [favorites, setFavorites] = useState([]); // Stores all favorite recipes
  const [filteredFavorites, setFilteredFavorites] = useState([]); // Stores filtered list of favorites based on search, category, and sort
  const [searchTerm, setSearchTerm] = useState(''); // Stores the search term entered by the user
  const [filterCategory, setFilterCategory] = useState(''); // Stores the selected category for filtering
  const [sortByDate, setSortByDate] = useState(false); // Boolean to toggle sorting by creation date

  // Fetch and load favorites from localStorage when the component mounts
  useEffect(() => {
    // Get stored favorites from localStorage or initialize as an empty array
    const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavorites(storedFavorites); // Set all favorites in the state
    setFilteredFavorites(storedFavorites); // Initialize the filtered favorites to match all favorites
  }, []);

  // Apply search, filter, and sort to the favorites whenever relevant states change
  useEffect(() => {
    let updatedFavorites = favorites; // Start with the original list of favorites

    // Search: filter recipes by name or ingredients based on the search term
    if (searchTerm) {
      updatedFavorites = updatedFavorites.filter(
        (recipe) =>
          recipe.name.toLowerCase().includes(searchTerm.toLowerCase()) || // Check if name contains the search term
          recipe.ingredients.some((ingredient) =>
            ingredient.toLowerCase().includes(searchTerm.toLowerCase()) // Check if any ingredient contains the search term
          )
      );
    }

    // Filter by category: filter recipes by selected category
    if (filterCategory) {
      updatedFavorites = updatedFavorites.filter(
        (recipe) => recipe.category === filterCategory // Filter by category
      );
    }

    // Sort by Date: sort recipes based on their creation date in descending order
    if (sortByDate) {
      updatedFavorites = [...updatedFavorites].sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt) // Sort based on createdAt date
      );
    }

    // Update filteredFavorites with the result after applying search, filter, and sort
    setFilteredFavorites(updatedFavorites);
  }, [searchTerm, filterCategory, sortByDate, favorites]); // Dependencies to re-run useEffect when any of these states change

  return (
    <div className="recipe-list-container">
      <h1 className="recipe-list-title">Favorite Recipes</h1>

      {/* Filters Section: Allows users to search, filter by category, and sort by date */}
      <div className="filters-container">
        {/* Search input: To filter recipes by name or ingredients */}
        <input
          type="text"
          placeholder="Search recipes..."
          value={searchTerm} // Value is controlled by state
          onChange={(e) => setSearchTerm(e.target.value)} // Update search term on change
          className="search-bar"
        />

        {/* Category filter: Dropdown to select a category to filter recipes */}
        <select
          value={filterCategory} // Controlled by the filterCategory state
          onChange={(e) => setFilterCategory(e.target.value)} // Update category on change
          className="category-filter"
        >
          <option value="">All Categories</option> {/* Option to show all categories */}
          {/* Dynamically create category options from favorites */}
          {[...new Set(favorites.map((recipe) => recipe.category))].map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>

        {/* Sort by Date: Checkbox to toggle sorting by date */}
        <label className="date-sort">
          <input
            type="checkbox"
            checked={sortByDate} // Controlled by sortByDate state
            onChange={() => setSortByDate(!sortByDate)} // Toggle sort by date on change
          />
          Sort by Date
        </label>
      </div>

      {/* Display message if no favorite recipes are available */}
      {filteredFavorites.length === 0 ? (
        <p>No favorite recipes yet!</p>
      ) : (
        // Display list of filtered recipes
        <div className="recipe-list">
          {filteredFavorites.map((recipe) => (
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
              {/* Edit button: Link to the Edit page for each recipe */}
              <Link to={`/edit/${recipe._id}`} className="edit-button">Edit Recipe</Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorite;
