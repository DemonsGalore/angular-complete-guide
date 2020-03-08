import { Injectable } from "@angular/core";
import { MatSnackBar } from '@angular/material/snack-bar';
import { StatusType } from '../models';

@Injectable()
export class SnackbarService {
  constructor(private snackBar: MatSnackBar) {}

  displaySnackBar(message: string, status: StatusType) {
    let panelClass = [];

    if (status === StatusType.ERROR) {
      panelClass = ['mat-toolbar', 'mat-warn'];
    }

    this.snackBar.open(message, null, {
      duration: 3000,
      panelClass
    });
  }
}
