import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecipesComponent, RecipeStartComponent, RecipeEditComponent, RecipeDetailComponent } from './components/recipes';
import { ShoppingListComponent } from './components/shopping-list';
import { RecipeResolverService } from './services';

const routes: Routes = [
  { path: '', redirectTo: '/recipes', pathMatch: 'full' },
  { path: 'recipes', component: RecipesComponent, resolve: [RecipeResolverService], children: [
    { path: '', component: RecipeStartComponent },
    { path: 'new', component: RecipeEditComponent },
    { path: ':id', component: RecipeDetailComponent, resolve: [RecipeResolverService] },
    { path: ':id/edit', component: RecipeEditComponent, resolve: [RecipeResolverService] }
  ] },
  { path: 'shopping-list', component: ShoppingListComponent }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
