import { Component, OnInit } from '@angular/core';
import { Recipe } from './recipe';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements OnInit {
  selectedRecipe: Recipe;

  constructor() { }

  ngOnInit() {
  }

  setSelectedRecipe(recipe: Recipe){
    // console.log(`selected recipe set ${recipe.name}`);
    this.selectedRecipe = recipe;
  }

}
