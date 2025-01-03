// Import the Recipe model for interacting with the database
const Recipe = require('../models/Recipe');

// Create a new recipe
const createRecipe = async (req, res) => {
  try {
    // Create a new recipe instance with data from the request body
    const recipe = new Recipe({
      ...req.body, // Spread the properties from the request body into the new Recipe object
    });

    // Save the recipe in the database
    await recipe.save();
    
    // Send a success response with the created recipe and HTTP status 201 (Created)
    res.status(201).json(recipe);
  } catch (err) {
    // If an error occurs, log it and send a 400 (Bad Request) response with the error message
    console.error('Error creating recipe:', err);
    res.status(400).json({ error: err.message });
  }
};

// Get all recipes from the database
const getRecipes = async (req, res) => {
  try {
    // Fetch all recipes using the Recipe model
    const recipes = await Recipe.find();
    
    // Send a success response with the list of recipes and HTTP status 200 (OK)
    res.status(200).json(recipes);
  } catch (err) {
    // If an error occurs, send a 400 (Bad Request) response with the error message
    res.status(400).json({ error: err.message });
  }
};

// Get a recipe by its ID
const getRecipeById = async (req, res) => {
  try {
    // Find the recipe by its ID from the request parameters
    const recipe = await Recipe.findById(req.params.id);
    
    // If the recipe does not exist, return a 404 (Not Found) response
    if (!recipe) return res.status(404).json({ error: 'Recipe not found' });
    
    // Send a success response with the found recipe and HTTP status 200 (OK)
    res.status(200).json(recipe);
  } catch (err) {
    // If an error occurs, send a 400 (Bad Request) response with the error message
    res.status(400).json({ error: err.message });
  }
};

// Update an existing recipe
const updateRecipe = async (req, res) => {
  try {
    // Extract the recipe ID from the request parameters
    const { id } = req.params;

    // Use the ID to find and update the recipe in the database
    const updatedRecipe = await Recipe.findByIdAndUpdate(
      id,
      {
        ...req.body, // Update the recipe fields with the data from the request body
      },
      { new: true } // Return the updated document
    );

    // If the recipe is not found, return a 404 (Not Found) response
    if (!updatedRecipe) {
      return res.status(404).json({ error: 'Recipe not found' });
    }

    // Send a success response with the updated recipe and HTTP status 200 (OK)
    res.status(200).json(updatedRecipe);
  } catch (err) {
    // If an error occurs, send a 400 (Bad Request) response with the error message
    res.status(400).json({ error: err.message });
  }
};

// Delete a recipe by its ID
const deleteRecipe = async (req, res) => {
  try {
    // Find and delete the recipe by its ID
    const recipe = await Recipe.findByIdAndDelete(req.params.id);

    // If the recipe is not found, return a 404 (Not Found) response
    if (!recipe) {
      return res.status(404).json({ error: 'Recipe not found' });
    }

    // Send a success response confirming the deletion with HTTP status 200 (OK)
    res.status(200).json({ message: 'Recipe deleted successfully' });
  } catch (err) {
    // If an error occurs, send a 400 (Bad Request) response with the error message
    res.status(400).json({ error: err.message });
  }
};

// Export all the controller functions so they can be used in routes
module.exports = { createRecipe, getRecipes, getRecipeById, updateRecipe, deleteRecipe };
