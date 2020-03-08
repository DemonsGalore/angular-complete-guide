import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from './auth.service';
import { AuthResponseData } from './models';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { SnackbarService } from '../services';
import { StatusType } from '../models';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  authForm: FormGroup;
  isSignUpMode = true;
  isLoading = false;
  error: string = null;

  constructor(
    private authService: AuthService,
    private router: Router,
    private snackBarService: SnackbarService
  ) {}

  ngOnInit() {
    this.initForm();
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

    this.isLoading = true;

    const email = this.authForm.value.email;
    const password = this.authForm.value.password;

    let authObservable: Observable<AuthResponseData>;

    if (this.isSignUpMode) {
      authObservable = this.authService.signUp(email, password);
    } else {
      authObservable = this.authService.signIn(email, password);
    }

    authObservable.subscribe(
      () => {
        this.isLoading = false;
        this.router.navigate(['/recipes']);
      },
      (errorMessage: string) => {
        this.error = errorMessage;
        this.isLoading = false;
        this.snackBarService.displaySnackBar(errorMessage, StatusType.ERROR);
      }
    );

    this.authForm.reset();
  }

  // onHandleError() {
  //   this.error = null;
  // }
}
