import { Component, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/take';

import { ActivatedRoute, Params, Router } from '@angular/router';
import { AddIngredients } from '../../shopping-list/store/shopping-list.actions';
import {RecipeFeatureState, RecipeState} from '../store/recipe.reducers';
import {DeleteRecipe} from '../store/recipe.actions';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  recipeState: Observable<RecipeState>;
  id: number;

  constructor(private currentRoute: ActivatedRoute,
              private router: Router,
              private store: Store<RecipeFeatureState>) {
               }

  ngOnInit() {
    this.currentRoute.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];   //plus to convert to number
        this.recipeState = this.store.select('recipes');
      });
  }

  onAddToShoppingList() {
    this.store.select('recipes')
      .take(1)
      .subscribe((recipeState: RecipeState) => {
        this.store.dispatch(new AddIngredients(recipeState.recipes[this.id].ingredients));
      });
  }

  onEditRecipe() {
    this.router.navigate(['edit'], {relativeTo: this.currentRoute});
    // example with passing parameter:
    // this.router.navigate(['../', this.id, 'edit'], {relativeTo: this.currentRoute});
  }

  onDeleteRecipe() {
    this.store.dispatch(new DeleteRecipe(this.id))
    this.router.navigate(['/recipes']);
  }
}
