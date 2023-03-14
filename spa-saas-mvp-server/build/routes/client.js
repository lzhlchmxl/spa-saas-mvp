"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const middleware_1 = require("../middleware");
const router = express_1.default.Router();
/*
    GET /api/client:id
    Description:
    Request body: no request body
    Response body: ClientDetails
*/
router.get('/:clientId', middleware_1.isAuthenticated, (req, res) => {
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
exports.default = router;
