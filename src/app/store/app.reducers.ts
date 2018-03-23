import { ShoppingListState } from "../shopping-list/store/shopping-list.reducers";
import { AuthState } from "../auth/store/auth.reducers";


export interface AppState {
    shoppingList: ShoppingListState,
    auth: AuthState
}