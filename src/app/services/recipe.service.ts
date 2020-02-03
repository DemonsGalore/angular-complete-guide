import { Recipe } from '../models/recipe.model';
import { Ingredient } from '../models/ingredient.model';

export class RecipeService {
  private recipes: Recipe[] = [
    new Recipe(
      'A Test Recipe',
      'Just a test',
      'https://cdn.pixabay.com/photo/2018/10/31/12/37/healthy-food-3785722_960_720.jpg',
      [
        new Ingredient('Meat', 1),
        new Ingredient('French Fries', 20)
      ]
    ),
    new Recipe(
      'Another Recipe',
      'Just another test',
      'https://cdn.pixabay.com/photo/2018/10/31/12/37/healthy-food-3785722_960_720.jpg',
      [
        new Ingredient('Meat', 2),
        new Ingredient('French Fries', 20)
      ]
    ),
    new Recipe(
      'One more Recipe',
      'The last test',
      'https://cdn.pixabay.com/photo/2018/10/31/12/37/healthy-food-3785722_960_720.jpg',
      [
        new Ingredient('Meat', 3),
        new Ingredient('French Fries', 20)
      ]
    )
  ];

  getRecipes() {
    return this.recipes.slice();
  }

  getRecipe(index: number) {
    return this.recipes[index];
  }
}
