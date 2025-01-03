// Updated recipeRoutes.js
const express = require('express');
const router = express.Router();
const { createRecipe, getRecipes, getRecipeById, updateRecipe, deleteRecipe } = require('../controllers/recipeController');

// Route to get all recipes
router.get('/', getRecipes);

// Route to get a recipe by ID
router.get('/:id', getRecipeById);

// Route to create a new recipe
router.post('/add', createRecipe);

// Route to update a recipe by ID
router.put('/update/:id', updateRecipe);

// Route to delete a recipe by ID
router.delete('/:id', deleteRecipe);

module.exports = router;
