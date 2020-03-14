import { NgModule } from "@angular/core";
import { Routes, RouterModule } from '@angular/router';
import { ShoppingListComponent } from './components';

const routes: Routes = [
  { path: 'shopping-list', component: ShoppingListComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)]
})
export class ShoppingListRoutingModule {}
