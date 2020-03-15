import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AuthComponent } from './auth.component';
import { AuthRoutingModule } from './auth.routing';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [
    AuthComponent
  ],
  imports: [
    CommonModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
    MatProgressSpinnerModule,
  ],
  exports: [],
  providers: [],
})
export class AuthModule {}