import { Injectable } from '@angular/core';
import { Actions, ofType, Effect } from '@ngrx/effects';
import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { switchMap, catchError, map, tap } from 'rxjs/operators';
import { of, Observable } from 'rxjs';

import { AuthResponseData, User } from '../models';
import * as AuthActions from './auth.actions';
import { StatusType } from 'app/models';
import { SnackbarService } from 'app/services';
import { AuthService } from '../auth.service';

const handleAuthentication = (email: string, userId: string, token: string, expiresIn: number): AuthActions.AuthenticateSuccess => {
    const expirationDate = new Date(new Date().getTime() + +expiresIn * 1000);

    const user = new User(
        email,
        userId,
        token,
        expirationDate
    );

    localStorage.setItem('userData', JSON.stringify(user));

    return new AuthActions.AuthenticateSuccess(user);
};

const handleError = (errorResponse: HttpErrorResponse): Observable<AuthActions.AuthenticateFail> => {
    let errorMessage = 'An unknown error occured!';

    if (!errorResponse.error || !errorResponse.error.error) {
        return of(new AuthActions.AuthenticateFail(errorMessage));
    }

    switch (errorResponse.error.error.message) {
        case 'EMAIL_EXISTS':
            errorMessage = 'This email already exists.';
            break;
        case 'INVALID_EMAIL':
            errorMessage = 'Invalid email.'
            break;
        case 'WEAK_PASSWORD':
            errorMessage = 'The password must be 6 characters long or more.';
            break;
        case 'INVALID_PASSWORD':
            errorMessage = 'The password is invalid.';
            break;
        case 'EMAIL_NOT_FOUND':
            errorMessage = 'Email not found.';
            break;
        case 'USER_DISABLED':
            errorMessage = 'The user account has been disabled.';
            break;
    }

    return of(new AuthActions.AuthenticateFail(errorMessage));
};

@Injectable()
export class AuthEffects {
    @Effect()
    authSignUp = this.actions$.pipe(
        ofType(AuthActions.SIGN_UP),
        switchMap((action: AuthActions.SignUp) => {
            const { email, password } = action.payload;

            return this.http.post<AuthResponseData>(
                'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBMapSf5DNsu2xg2WyaG8mHK26p1q22lSQ',
                {
                    email,
                    password,
                    returnSecureToken: true
                }
            ).pipe(
                tap(resData => this.authService.setSignOutTimer(+resData.expiresIn * 1000)),
                map(resData => handleAuthentication(resData.email, resData.localId, resData.idToken, +resData.expiresIn)),
                catchError((errorResponse: HttpErrorResponse) => handleError(errorResponse))
            );
        })
    );

    @Effect()
    authSignIn = this.actions$.pipe(
        ofType(AuthActions.SIGN_IN),
        switchMap((action: AuthActions.SignIn) => {
            const { email, password } = action.payload;

            return this.http.post<AuthResponseData>(
                'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBMapSf5DNsu2xg2WyaG8mHK26p1q22lSQ',
                {
                    email,
                    password,
                    returnSecureToken: true
                }
            ).pipe(
                tap(resData => this.authService.setSignOutTimer(+resData.expiresIn * 1000)),
                map(resData => handleAuthentication(resData.email, resData.localId, resData.idToken, +resData.expiresIn)),
                catchError((errorResponse: HttpErrorResponse) => handleError(errorResponse))
            );
        }),
    );

    @Effect()
    authAutoSignIn = this.actions$.pipe(
        ofType(AuthActions.AUTO_SIGN_IN),
        map(() => {
            const userData: {
                email: string;
                id: string;
                _token: string;
                _tokenExpirationDate: string;
            } = JSON.parse(localStorage.getItem('userData'));

            if (!userData) return { type: 'DUMMY' };

            const loadedUser = new User(
                userData.email,
                userData.id,
                userData._token,
                new Date(userData._tokenExpirationDate)
            );

            if (loadedUser.token) {
                const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
                this.authService.setSignOutTimer(expirationDuration);
                return new AuthActions.AuthenticateSuccess(loadedUser);
            }

            return { type: 'DUMMY' };
        })
    );

    @Effect({ dispatch: false })
    authSignOut = this.actions$.pipe(
        ofType(AuthActions.SIGN_OUT),
        tap(() => {
            this.authService.clearSignOutTimer();
            localStorage.removeItem('userData');
            this.router.navigate(['/auth']);
        })
    );

    @Effect({ dispatch: false })
    authSignInSuccess = this.actions$.pipe(
        ofType(AuthActions.AUTHENTICATE_SUCCESS),
        tap(() => this.router.navigate(['/recipes']))
    );
    
    @Effect({ dispatch: false })
    authSignInFail = this.actions$.pipe(
        ofType(AuthActions.AUTHENTICATE_FAIL),
        map((action: AuthActions.AuthenticateFail) => action.payload),
        tap(errorMessage => this.snackBarService.displaySnackBar(errorMessage, StatusType.ERROR))
    );

    constructor(
        private actions$: Actions,
        private http: HttpClient,
        private router: Router,
        private authService: AuthService,
        private snackBarService: SnackbarService,
    ) {}
}
