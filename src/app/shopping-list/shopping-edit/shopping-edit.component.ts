import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Subscription } from 'rxjs/Subscription';
import { Store } from '@ngrx/store';

import { Ingredient } from '../../shared/ingredient';
import { AddIngredient, DeleteIngredient, UpdateIngredient, StopEdit } from '../store/shopping-list.actions';
import { AppState } from '../../store/app.reducers';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('f') slForm: NgForm;
  subscription: Subscription;
  editMode = false;
  editedItem: Ingredient;

  constructor(private store: Store<AppState>) {
    }

  ngOnInit() {
    this.subscription = this.store.select('shoppingList')
      .subscribe(
        data => {
          if (data.editedIngredientIndex > -1) {
            this.editedItem = data.editedIngredient;
            this.editMode = true;
            this.slForm.setValue({
              name: this.editedItem.name,
              amount: this.editedItem.amount
            });
          } else {
            this.editMode = false;
          }
        }
      );
  }

  ngOnDestroy(): void {
    this.store.dispatch(new StopEdit());
    this.subscription.unsubscribe();
  }


  onSubmit(form: NgForm) {
    const formValue = form.value;
    const ingredient = new Ingredient(formValue.name, formValue.amount);
    if (this.editMode) {
      // console.log(`updating ingredient ${ingredient.name}`);
      this.store.dispatch(new UpdateIngredient({ingredient: ingredient}));
    } else {
      // console.log(`adding new ingredient ${ingredient.name}`);
      this.store.dispatch(new AddIngredient(ingredient));
    }
    this.onClear();
  }

  onDelete() {
    if (this.editMode) {
       console.log(`deleting ingredient ${this.editedItem.name}`);
      this.store.dispatch(new DeleteIngredient());
    }
    this.onClear();
  }

  onClear() {
    this.editMode = false;
    this.slForm.reset();    
  }
}
