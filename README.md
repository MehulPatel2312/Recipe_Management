# Recipe Management Application

## Description
The Recipe Management application allows users to manage recipes by creating, viewing, updating, deleting, and organizing them. It includes features such as:

- Adding, editing, and deleting recipes
- Marking recipes as favorites
- Sorting and filtering recipes by category, name, and favorite status
- Searching for recipes by name or ingredients

## Features
- **Add Recipes**: Users can add new recipes with details like name, ingredients, instructions, and category.
- **Edit Recipes**: Update existing recipes.
- **Delete Recipes**: Remove recipes from the list.
- **Mark as Favorite**: Mark recipes as favorites for quick access.
- **Filter and Sort**: Filter recipes by category and sort them by name or favorite status.
- **Search**: Search for recipes by name or ingredients.

## Installation and Setup

### Backend Setup

1. **Install Dependencies**
   
   cd server
   npm install

2. **Environment Variables**
   Create a `.env` file in the `server` directory with the following content:
   env
   MONGO_URI=<your_mongodb_connection_string>
   PORT=5000
   

3. **Start the Backend Server**
   
   npm start
   
   The server will run on `http://localhost:5000` by default.

### Frontend Setup

1. **Install Dependencies**
   
   cd src
   npm install
   

2. **Start the Frontend Application**
   
   npm start
   
   The application will run on `http://localhost:3000` by default.

## Folder Structure

/recipe-management
|_____/node_modules
|_____/public
|_____/server
|     |_____/controllers
|     |     |_____recipeControllers.js
|     |_____/models
|     |     |_____Recipe.js
|     |_____/routes
|     |     |_____recipeRoutes.js
|     |_____.env
|     |_____package-lock.json
|     |_____package.json
|     |_____server.js
|_____/src
      |_____/components
      |     |_____DeleteButton.js
      |     |_____Favorite.js
      |     |_____RecipeEdit.css
      |     |_____RecipeEdit.js
      |     |_____RecipeForm.js
      |     |_____RecipeForm.css
      |     |_____RecipeList.css
      |     |_____RecipeList.js
      |_____App.css
      |_____App.js


## Scripts

### Backend Scripts
- `npm start`: Start the backend server

### Frontend Scripts
- `npm start`: Start the frontend application

## Libraries and Tools Used

### Backend
- `express`: Backend framework
- `mongoose`: MongoDB object modeling
- `dotenv`: Environment variable management
- `cors`: Cross-Origin Resource Sharing

### Frontend
- `react`: Frontend library
- `react-router-dom`: Routing for React

## How to Run the Application

1. **Start the Backend**
   
   cd server
   npm start
   
2. **Start the Frontend**
   
   cd src
   npm start
   

## Important Notes
- Ensure MongoDB is running and accessible.
- The application is designed for local development; additional configurations may be needed for production deployment.

## Contribution
Feel free to fork this repository and contribute to the project by submitting pull requests.

