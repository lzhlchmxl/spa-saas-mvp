import express from 'express';
import { isAuthenticated } from '../middleware';

const router = express.Router();

/*
    GET /api/client:id
    Description: 
    Request body: no request body
    Response body: ClientDetails
*/
router.get('/:clientId', isAuthenticated, (req, res) => {

  res.send('This is the client dashboard');
});


// app.get('/api/recipe-list/:recipeId', async (req, res) => {
//   const database = await readDatabase();

//   const recipe: T.RecipeDetail | undefined = database.recipes.find( recipe => recipe.id === req.params.recipeId)

//   if (recipe === undefined) {
//       res.status(204).send();
//       console.log(`the requested recipe is not found in the database`);
//   }

//   res.send(recipe); // Note: still has the type Recipe instead of RecipeDetail, though the two types are identical
// });

export default router;