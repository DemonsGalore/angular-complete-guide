import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';

import * as fromApp from 'app/store/app.reducer';
import * as AuthActions from './store/auth.actions';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit, OnDestroy {
  authForm: FormGroup;
  isSignUpMode = true;
  isLoading = false;
  private storeSubscription: Subscription;

  constructor(private store: Store<fromApp.ApplicationState>) {}

  ngOnInit() {
    this.initForm();

    this.storeSubscription = this.store.select('auth').subscribe(authState => {
      this.isLoading = authState.loading;
    });
  }

  private initForm() {
    this.authForm = new FormGroup({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
  }

  onToggleMode() {
    this.isSignUpMode = !this.isSignUpMode;
  }

  onSubmit() {
    if (this.authForm.invalid) return;

    const email = this.authForm.value.email;
    const password = this.authForm.value.password;

    if (this.isSignUpMode) {
      this.store.dispatch(new AuthActions.SignUp({ email, password }));
    } else {
      this.store.dispatch(new AuthActions.SignIn({ email, password }));
    }

    this.authForm.reset();
  }

  ngOnDestroy() {
    this.storeSubscription.unsubscribe();
  }
}
