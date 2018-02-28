import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe';
import 'rxjs/add/operator/map';

@Injectable()
export class DataStorageService {
  private recipesUrl = 'https://jgronost-udemy-recipe-book.firebaseio.com/recipes.json';

  constructor(private http: Http, private recipeService: RecipeService) { }

  storeRecipes() {
    return this.http.put(this.recipesUrl, this.recipeService.getRecipes());
  }

  getRecipes() {
    this.http.get(this.recipesUrl)
      .map(
        (response: Response) => {
        const recipes: Recipe[] = response.json();
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
