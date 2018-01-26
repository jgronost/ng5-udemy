import { Injectable, EventEmitter } from '@angular/core';
import { Recipe } from './recipe';
import { Ingredient } from '../shared/ingredient';

@Injectable()
export class RecipeService {
  recipeSelected = new EventEmitter<Recipe>();
  private recipes: Recipe[] = [
    new Recipe('Der Schnitzel',
      'A test description',
      'https://www.bbcgoodfood.com/sites/default/files/recipe-collections/collection-image/2013/05/frying-pan-pizza-easy-recipe-collection.jpg',
      [
        new Ingredient('Schwein', 1),
        new Ingredient('Kartofeln', 3)]
      ),
    new Recipe('Der Hamburger',
      'A test description 2',
      'https://www.bbcgoodfood.com/sites/default/files/recipe-collections/collection-image/2013/05/frying-pan-pizza-easy-recipe-collection.jpg',
      [
        new Ingredient('Brötli', 1 ),
        new Ingredient('HackFleish', 2),
        new Ingredient('Gurke', 3)
      ]
    ),
    new Recipe('A test Recipe 3',
    'A test description 3',
    'https://www.bbcgoodfood.com/sites/default/files/recipe-collections/collection-image/2013/05/frying-pan-pizza-easy-recipe-collection.jpg',
    [])
  ];

  constructor() { }

  getRecipes() {
    return this.recipes.slice();
  }

}
