import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe';

@Injectable()
export class DataStorageService {
  private recipesUrl = 'https://jgronost-udemy-recipe-book.firebaseio.com/recipes.json';

  constructor(private http: Http, private recipeService: RecipeService) { }

  storeRecipes() {
    return this.http.put(this.recipesUrl, this.recipeService.getRecipes());
  }

  getRecipes() {
    this.http.get(this.recipesUrl)
      .subscribe(
        (response: Response) => {
          const recipes: Recipe[] = response.json(); 
          this.recipeService.setRecipes(recipes);
        }
      );
  }

}
