import { NgModule } from "@angular/core";
import { Routes, RouterModule } from '@angular/router';
import { ShoppingListComponent } from './components';

const routes: Routes = [
  { path: '', component: ShoppingListComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)]
})
export class ShoppingListRoutingModule {}
