import { NgModule } from "@angular/core";
import { Routes, RouterModule } from '@angular/router';
import { RecipesComponent, RecipeStartComponent, RecipeEditComponent, RecipeDetailComponent } from './components';
import { AuthGuard } from 'src/app/auth';
import { RecipeResolverService } from 'src/app/services';

const routes: Routes = [
  {
    path: 'recipes',
    component: RecipesComponent,
    canActivate: [AuthGuard],
    resolve: [RecipeResolverService],
    children: [
      { path: '', component: RecipeStartComponent },
      { path: 'new', component: RecipeEditComponent },
      { path: ':id', component: RecipeDetailComponent, resolve: [RecipeResolverService] },
      { path: ':id/edit', component: RecipeEditComponent, resolve: [RecipeResolverService] }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)]
})
export class RecipesRoutingModule {}
