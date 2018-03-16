import { Action } from '@ngrx/store';
import { Ingredient } from '../../shared/ingredient';
import { ADD_INGREDIENT, ShoppingListActions } from './shopping-list.actions';



const initalState = {
    ingredients: [
        new Ingredient('Apples', 5),
        new Ingredient('Tomatoes', 10)
      ]
};

export function shoppingListReducer(state  = initalState, action: ShoppingListActions) {
    switch (action.type) {
        case ADD_INGREDIENT:
            return {
                ...state, 
                ingredients: [...state.ingredients, action.payload]
            }
    }
    return state;
}