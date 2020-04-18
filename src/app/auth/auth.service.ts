import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import * as fromApp from 'app/store/app.reducer';
import * as AuthActions from './store/auth.actions';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private tokenExpirationTimer: any;

  constructor(private store: Store<fromApp.ApplicationState>) {}

  setSignOutTimer(expirationDuration: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.store.dispatch(new AuthActions.SignOut());
    }, expirationDuration);
  }

  clearSignOutTimer() {
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
  }
}
