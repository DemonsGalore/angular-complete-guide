import { Component, Input } from '@angular/core';
import { Recipe } from '../../../models/recipe.model';
import { RecipeService } from 'src/app/services/recipe.service';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html'
})
export class RecipeItemComponent {
  @Input() recipe: Recipe;
  
  constructor(private recipeService: RecipeService) {}

  onSelected() {
    this.recipeService.selectedRecipe.emit(this.recipe);
  }
}
