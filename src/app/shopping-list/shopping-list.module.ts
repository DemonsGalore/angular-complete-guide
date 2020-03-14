import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ShoppingListRoutingModule } from './shopping-list-routing.module';
import { ShoppingListComponent, ShoppingEditComponent } from './components';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  declarations: [
    ShoppingListComponent,
    ShoppingEditComponent
  ],
  imports: [
    RouterModule,
    ShoppingListRoutingModule,
    CommonModule,
    FormsModule,
    FontAwesomeModule,
    FlexLayoutModule,
    MatButtonModule,
    MatDividerModule,
    MatInputModule,
  ]
})
export class ShoppingListModule {};