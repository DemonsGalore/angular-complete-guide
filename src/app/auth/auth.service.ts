import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { throwError, BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { AuthResponseData, User } from './models';
import { Store } from '@ngrx/store';
import * as fromApp from 'app/store/app.reducer';
import * as AuthActions from './store/auth.actions';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private tokenExpirationTimer: any;

  constructor(
    private http: HttpClient,
    private router: Router,
    private store: Store<fromApp.ApplicationState>
  ) {}

  signUp(email: string, password: string) {
    return this.http.post<AuthResponseData>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBMapSf5DNsu2xg2WyaG8mHK26p1q22lSQ',
      {
        email,
        password,
        returnSecureToken: true
      }
    ).pipe(
      catchError(this.handleError),
      tap(response => {
        this.handleAuthentication(
          response.email,
          response.localId,
          response.idToken,
          +response.expiresIn
        );
      })
    );
  }

  signIn(email: string, password: string) {
    return this.http.post<AuthResponseData>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBMapSf5DNsu2xg2WyaG8mHK26p1q22lSQ',
      {
        email,
        password,
        returnSecureToken: true
      }
    ).pipe(
      catchError(this.handleError),
      tap(response => {
        this.handleAuthentication(
          response.email,
          response.localId,
          response.idToken,
          +response.expiresIn
        );
      })
    );
  }

  autoSignIn() {
    const userData: {
      email: string;
      id: string;
      _token: string;
      _tokenExpirationDate: string;
    } = JSON.parse(localStorage.getItem('userData'));

    if (!userData) return;

    const loadedUser = new User(
      userData.email,
      userData.id,
      userData._token,
      new Date(userData._tokenExpirationDate)
    );

    if (loadedUser.token) {
      this.store.dispatch(new AuthActions.SignIn(loadedUser));
      const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
      this.autoSignOut(expirationDuration);
    }
  }

  signOut() {
    this.store.dispatch(new AuthActions.SignOut());
    this.router.navigate(['/auth']);
    localStorage.removeItem('userData');

    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
  }

  autoSignOut(expirationDuration: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.signOut();
    }, expirationDuration);
  }

  private handleAuthentication(email: string, userId: string, token: string, expiresIn: number) {
    const expirationDate = new Date(
      new Date().getTime() + expiresIn * 1000
    );
    const user = new User(
      email,
      userId,
      token,
      expirationDate
    );
    this.store.dispatch(new AuthActions.SignIn(user));
    this.autoSignOut(expiresIn * 1000);
    localStorage.setItem('userData', JSON.stringify(user));
  }

  private handleError(errorResponse: HttpErrorResponse) {
    let errorMessage = 'An unknown error occured!';

    if (!errorResponse.error || !errorResponse.error.error) {
      return throwError(errorMessage);
    }

    // TODO: add error messages
    switch (errorResponse.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMessage = 'This email already exists.';
        return throwError(errorMessage);
      case 'INVALID_EMAIL':
        errorMessage = 'Invalid email.'
        return throwError(errorMessage);
      case 'WEAK_PASSWORD':
        errorMessage = 'The password must be 6 characters long or more.';
        return throwError(errorMessage);
      case 'INVALID_PASSWORD':
        errorMessage = 'The password is invalid.';
        return throwError(errorMessage);
      case 'EMAIL_NOT_FOUND':
        errorMessage = 'Email not found.';
        return throwError(errorMessage);
      case 'USER_DISABLED':
        errorMessage = 'The user account has been disabled.';
        return throwError(errorMessage);
      default:
        return throwError(errorMessage);
    }
  }
}
