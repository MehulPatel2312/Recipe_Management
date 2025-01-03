// Updated Recipe.js schema
const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
  name: { type: String, required: true }, // Recipe name (required field)
  ingredients: [String], // Array of ingredients
  instructions: String, // Recipe instructions
  category: String, // Category of the recipe
  createdAt: { type: Date, default: Date.now }, // Timestamp for when the recipe was created
  isFavorite: { type: Boolean, default: false }, // Favorite flag
});

// Export the Recipe model
module.exports = mongoose.model('Recipe', recipeSchema);
