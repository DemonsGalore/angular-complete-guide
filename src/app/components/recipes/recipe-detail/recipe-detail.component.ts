import { Component, Input } from '@angular/core';
import { Recipe } from '../../../models/recipe.model';
import { ShoppingListService } from 'src/app/services/shopping-list.service';
import { Ingredient } from 'src/app/models/ingredient.model';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html'
})
export class RecipeDetailComponent {
  @Input() recipe: Recipe;

  constructor(private shoppingListService: ShoppingListService) {}

  onAddToShoppingList() {
    this.shoppingListService.addIngredients(this.recipe.ingredients)
  }
}
