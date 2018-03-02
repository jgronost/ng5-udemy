import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe';
import 'rxjs/add/operator/map';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class DataStorageService {
  private recipesUrl = 'https://jgronost-udemy-recipe-book.firebaseio.com/recipes.json';

  constructor(private http: Http, private recipeService: RecipeService, private authService: AuthService) { }

  storeRecipes() {
    const token = this.authService.getToken();

    return this.http.put(this.recipesUrl + `?auth=${token}`, this.recipeService.getRecipes());
  }

  getRecipes() {
    const token = this.authService.getToken();

    this.http.get(this.recipesUrl + `?auth=${token}`)
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
