import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Ingredient } from '../../shared/ingredient';
import { ShoppingListService } from '../shopping-list.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('f') slForm: NgForm;
  subscription: Subscription;
  editMode = false;
  editedItemIndex: number;
  editedItem: Ingredient;

  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit() {
    this.subscription = this.shoppingListService.startedEditing.subscribe((index: number) => {
      this.editMode = true;
      this.editedItemIndex = index;
      this.editedItem = this.shoppingListService.getIngredient(index);
      this.slForm.setValue({
        name: this.editedItem.name,
        amount: this.editedItem.amount
      });
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }


  onSubmit(form: NgForm) {
    const formValue = form.value;
    const ingredient = new Ingredient(formValue.name, formValue.amount);
    if (this.editMode) {
      // console.log(`updating ingredient ${ingredient.name}`);
      this.shoppingListService.updateIngredient(this.editedItemIndex, ingredient);
    } else {
      // console.log(`adding new ingredient ${ingredient.name}`);
      this.shoppingListService.addIngredient(ingredient);
    }
    this.onClear();
  }

  onDelete() {
    if (this.editMode) {
      // console.log(`deleting ingredient ${this.editedItem.name}`);
      this.shoppingListService.deleteIngredient(this.editedItemIndex);
    }
    this.onClear();
  }

  onClear() {
    this.editMode = false;
    this.slForm.reset();    
  }
}
