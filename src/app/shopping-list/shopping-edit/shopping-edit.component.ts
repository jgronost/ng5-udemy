import { Component, OnInit, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { Ingredient } from '../../shared/ingredient';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {
  @ViewChild('nameInput') nameInputRef: ElementRef;
  @ViewChild('amountInput') amountInputRef: ElementRef;

  @Output() ingedientAdded = new EventEmitter<Ingredient>();

  constructor() { }

  ngOnInit() {
  }

  onAddItem() {
    const ingredient = new Ingredient(this.nameInputRef.nativeElement.value, this.amountInputRef.nativeElement.value);
    // console.log(`emiting new ingredient ${ingredient.name}`);
    this.ingedientAdded.emit(ingredient);
  }
}
