import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Actions, Effect} from '@ngrx/effects';
import 'rxjs/add/operator/switchMap';

import {FETCH_RECIPES, FetchRecipes, SET_RECIPES} from './recipe.actions';
import {Recipe} from '../recipe';

@Injectable()
export class RecipeEffects {
  private recipesUrl = 'https://jgronost-udemy-recipe-book.firebaseio.com/recipes.json';

  @Effect()
  recipeFetch = this.actions$
    .ofType(FETCH_RECIPES)
    .switchMap((action: FetchRecipes) => {
      return this.httpClient.get<Recipe[]>(this.recipesUrl) // + `?auth=${token}`)
    })
    .map(
      recipes => {
        // add array removed in firebase due to its pure json nature
        for (let recipe of recipes) {
          if(!recipe['ingredients']) {
            console.log('restoring ingredients on recipe:' + recipe)
            recipe['ingredients'] = [];
          }
        }
        return {
          type: SET_RECIPES,
          payload: recipes
        }
      }
    );


  constructor (private actions$: Actions, private httpClient: HttpClient){}

}
