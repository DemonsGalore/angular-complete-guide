import { Recipe } from '../models';
import { Ingredient } from '../models';
import { Subject } from 'rxjs';

export class RecipeService {
  recipedsChanged = new Subject<Recipe[]>();

  private recipes: Recipe[] = [];
  // private recipes: Recipe[] = [
  //   new Recipe(
  //     'A Test Recipe',
  //     'Just a test',
  //     'https://cdn.pixabay.com/photo/2018/10/31/12/37/healthy-food-3785722_960_720.jpg',
  //     [
  //       new Ingredient('Meat', 43),
  //       new Ingredient('French Fries', 14)
  //     ]
  //   ),
  //   new Recipe(
  //     'Another Recipe',
  //     'Just another test',
  //     'https://cdn.pixabay.com/photo/2018/10/31/12/37/healthy-food-3785722_960_720.jpg',
  //     [
  //       new Ingredient('Meat', 2),
  //       new Ingredient('French Fries', 4)
  //     ]
  //   ),
  //   new Recipe(
  //     'One more Recipe',
  //     'The last test',
  //     'https://cdn.pixabay.com/photo/2018/10/31/12/37/healthy-food-3785722_960_720.jpg',
  //     [
  //       new Ingredient('Meat', 13),
  //       new Ingredient('French Fries', 1)
  //     ]
  //   )
  // ];

  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipedsChanged.next(this.recipes.slice());
  }

  getRecipes() {
    return this.recipes.slice();
  }

  getRecipe(index: number) {
    return this.recipes[index];
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipedsChanged.next(this.recipes.slice());
  }

  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
    this.recipedsChanged.next(this.recipes.slice());
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipedsChanged.next(this.recipes.slice());
  }
}
