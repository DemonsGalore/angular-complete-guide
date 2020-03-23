import { Action } from '@ngrx/store';
import { Ingredient } from '../models';

export const ADD_INGREDIENT = 'ADD_INGREDIENT';

export class AddIngredientAction implements Action {
  readonly type = ADD_INGREDIENT;
  payload: Ingredient;
}
