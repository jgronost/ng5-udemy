import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe';
import 'rxjs/add/operator/map';

@Injectable()
export class DataStorageService {
  private recipesUrl = 'https://jgronost-udemy-recipe-book.firebaseio.com/recipes.json';

  constructor(private httpClient: HttpClient, private recipeService: RecipeService) { }

  storeRecipes() {
    return this.httpClient.put(this.recipesUrl, this.recipeService.getRecipes(), {
        observe: 'body'}
      );
  }

  getRecipes() {

    this.httpClient.get<Recipe[]>(this.recipesUrl) // + `?auth=${token}`)
      .map(
        recipes => {
        // add array removed in firebase due to its pure json nature
        for (let recipe of recipes) {
          if(!recipe['ingredients']) {
            console.log('restoring ingredients on recipe:' + recipe)
            recipe['ingredients'] = [];
          }
        }
        return recipes;
      }
      )
      .subscribe(
        (recipes: Recipe[]) => {
          this.recipeService.setRecipes(recipes);
        }
      );
  }

}
