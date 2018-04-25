import { Component, OnInit} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import {Store} from '@ngrx/store';

import {RecipeFeatureState, RecipeState} from '../store/recipe.reducers';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  recipeState: Observable<RecipeState>;

  constructor(private store: Store<RecipeFeatureState>,
              private router: Router,
              private currentRoute: ActivatedRoute) {}

  ngOnInit() {
    this.recipeState = this.store.select('recipes');
  }

  onNewRecipe() {
    this.router.navigate(['new'], {relativeTo: this.currentRoute});
  }
}
