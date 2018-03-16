import { Action } from '@ngrx/store';
import { Ingredient } from '../../shared/ingredient';
import { ADD_INGREDIENT, ShoppingListActions, ADD_INGREDIENTS, UPDATE_INGREDIENT, DELETE_INGREDIENT, START_EDIT, STOP_EDIT } from './shopping-list.actions';

export interface AppState {
    shoppingList: ShoppingListState
}

export interface ShoppingListState {
    ingredients: Ingredient[],
    editedIngredient: Ingredient,
    editedIngredientIndex: number
}

const initalState: ShoppingListState = {
    ingredients: [
        new Ingredient('Apples', 5),
        new Ingredient('Tomatoes', 10)
      ],
    editedIngredient: null,
    editedIngredientIndex: -1
};

export function shoppingListReducer(state  = initalState, action: ShoppingListActions) {
    switch (action.type) {
        case ADD_INGREDIENT:
            return {
                ...state, 
                ingredients: [...state.ingredients, action.payload]
            };
        case ADD_INGREDIENTS:
            return {
                ...state, 
                ingredients: [...state.ingredients, ...action.payload]
            }
        case UPDATE_INGREDIENT:
            const ingredient = state.ingredients[state.editedIngredientIndex];
            const updatedIngredient = {
                ...ingredient,
                ...action.payload.ingredient
            };
            const ingredients = [...state.ingredients];
            ingredients[state.editedIngredientIndex] = updatedIngredient;
            return {
                ...state, 
                ingredients: ingredients,
                editedIngredient: null,
                editedIngredientIndex: -1
            };
        case DELETE_INGREDIENT:
            const oldIngredients = [...state.ingredients];
            oldIngredients.splice(state.editedIngredientIndex, 1);
            return {
                ...state,
                ingredients: oldIngredients,
                editedIngredient: null,
                editedIngredientIndex: -1
            }
        case START_EDIT:
            const editedIngredient = {...state.ingredients[action.payload]};
            return {
                ...state,
                editedIngredient: editedIngredient,
                editedIngredientIndex: action.payload
            }
        case STOP_EDIT:
            return {
                ...state,
                editedIngredient: null,
                editedIngredientIndex: -1
            }
        default:
        return state;
    }
}