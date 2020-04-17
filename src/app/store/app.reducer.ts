import { ActionReducerMap } from '@ngrx/store';

import * as fromAuth from '../auth/store/auth.reducer';
import * as fromShoppingList from '../shopping-list/store/shopping-list.reducer';

export interface ApplicationState {
    auth: fromAuth.AuthState;
    shoppingList: fromShoppingList.ShoppingListState;
}

export const appReducer: ActionReducerMap<ApplicationState> = {
    auth: fromAuth.authReducer,
    shoppingList: fromShoppingList.shoppingListReducer
};
