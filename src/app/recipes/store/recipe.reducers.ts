import {Recipe} from '../recipe';
import {Ingredient} from '../../shared/ingredient';
import {ADD_RECIPE, DELETE_RECIPE, RecipeActions, SET_RECIPES, UPDATE_RECIPE} from './recipe.actions';

export interface RecipeFeatureState {
  recipes: RecipeState;
}

export interface RecipeState {
  recipes: Recipe[];
}

const initalState: RecipeState = {
  recipes:  [
  new Recipe('Der Schnitzel',
    'A test description',
    'https://www.bbcgoodfood.com/sites/default/files/recipe-collections/'
    + 'collection-image/2013/05/frying-pan-pizza-easy-recipe-collection.jpg',
    [
      new Ingredient('Schwein', 1),
      new Ingredient('Kartofeln', 3)]
  ),
  new Recipe('Der Hamburger',
    'A test description 2',
    'https://www.bbcgoodfood.com/sites/default/files/recipe-collections/'
    + 'collection-image/2013/05/frying-pan-pizza-easy-recipe-collection.jpg',
    [
      new Ingredient('Brötli', 1 ),
      new Ingredient('HackFleish', 2),
      new Ingredient('Gurke', 3)
    ]
  ),
  new Recipe('A test Recipe 3',
    'A test description 3',
    'https://www.bbcgoodfood.com/sites/default/files/recipe-collections/'
    + 'collection-image/2013/05/frying-pan-pizza-easy-recipe-collection.jpg',
    [])
]
};


export function recipeReducer(state = initalState, action: RecipeActions) {

  switch (action.type) {
    case (SET_RECIPES):
      return {
        ...state,
        recipes: [...action.payload]
      };

    case (ADD_RECIPE):
      return {
        ...state,
        recipes: [...state.recipes, action.payload]
      };

    case (UPDATE_RECIPE):
      const recipe = state.recipes[action.payload.index];
      const updatedRecipe = {
        ...recipe,
        ...action.payload.updatedRecipe
      };
      const recipes = [...state.recipes];
      recipe[action.payload.index] = updatedRecipe;
      return {
        ...state,
        recipes: recipes
      };

    case (DELETE_RECIPE):
      const newRecipes = [...state.recipes].splice(action.payload, 1);
      return {
        ...state,
        recipes: newRecipes
      };

  }

  return state;
}
