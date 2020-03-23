// const featureReducer = createReducer(
//   initialState,
//   on(featureActions.action, state => ({ ...state, prop: updatedValue })),
// );

import { Ingredient } from '../models';
import { ADD_INGREDIENT, AddIngredientAction } from './shopping-list.actions';

// export function reducer(state: State | undefined, action: Action) {
//   return featureReducer(state, action);
// }

// import * as class from '../actions/class';

export interface State {
  ingredients: Ingredient[];
};

const initialState: State = {
  ingredients: []
};

export function shoppingListReducer(state = initialState, action: AddIngredientAction): State {
  switch (action.type) {
    case ADD_INGREDIENT: {
      return {
        ...state,
        ingredients: [...state.ingredients, action.payload]
      };
    }
    default: {
      return state;
    }
  }
}