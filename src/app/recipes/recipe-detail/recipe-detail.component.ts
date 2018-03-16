import { Component, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';

import { Recipe } from '../recipe';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RecipeService } from '../recipe.service';
import { Ingredient } from '../../shared/ingredient';
import { AddIngredients } from '../../shopping-list/store/shopping-list.actions';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  recipe: Recipe;
  id: number;

  constructor(private currentRoute: ActivatedRoute,
              private router: Router,
              private recipeService: RecipeService,
              private store: Store<{shoppingList: {ingredients: Ingredient[]}}>) {
               }

  ngOnInit() {
    this.currentRoute.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];   //plus to convert to number
        this.recipe = this.recipeService.getRecipe(this.id);
      });
  }

  onAddToShoppingList() {
    console.log(`onAddToShoppingList`);
    this.store.dispatch(new AddIngredients(this.recipe.ingredients));
  }

  onEditRecipe() {
    this.router.navigate(['edit'], {relativeTo: this.currentRoute});
    // example with passing parameter:
    // this.router.navigate(['../', this.id, 'edit'], {relativeTo: this.currentRoute});
  }

  onDeleteRecipe() {
    this.recipeService.deleteRecipe(this.id);
    this.router.navigate(['/recipes']);
  }
}
