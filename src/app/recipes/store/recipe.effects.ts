import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Actions, Effect} from '@ngrx/effects';
import {Store} from '@ngrx/store';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/withLatestFrom';

import {FETCH_RECIPES, FetchRecipes, SET_RECIPES, STORE_RECIPES} from './recipe.actions';
import {Recipe} from '../recipe';
import {RecipeFeatureState} from './recipe.reducers';

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

  @Effect({dispatch: false})
  recipeStore = this.actions$
    .ofType(STORE_RECIPES)
    .withLatestFrom(this.store.select('recipes'))
    .switchMap(([action, state]) => {
      return this.httpClient.put(this.recipesUrl, state.recipes, {
        observe: 'body'}
    );
  });


  constructor (private actions$: Actions, private httpClient: HttpClient, private store: Store<RecipeFeatureState>){}

}
