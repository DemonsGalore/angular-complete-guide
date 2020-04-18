import { Action } from '@ngrx/store';
import { User } from '../models';

export const SIGN_UP = '[Auth] Sign Up';
export const SIGN_IN = '[Auth] Sign In';
export const AUTO_SIGN_IN = '[Auth] Auto Sign In';
export const AUTHENTICATE_SUCCESS = '[Auth] Authenticate Success';
export const AUTHENTICATE_FAIL = '[Auth] Authenticate Fail';
export const SIGN_OUT = '[Auth] Sign Out';

export class SignUp implements Action {
    readonly type = SIGN_UP;
    constructor(public payload: { email: string; password: string }) {}
}

export class SignIn implements Action {
    readonly type = SIGN_IN;
    constructor(public payload: { email: string; password: string }) {}
}

export class AutoSignIn implements Action {
    readonly type = AUTO_SIGN_IN;
}

export class AuthenticateSuccess implements Action {
    readonly type = AUTHENTICATE_SUCCESS;
    constructor(public payload: User) {}
}

export class AuthenticateFail implements Action {
    readonly type = AUTHENTICATE_FAIL;
    constructor(public payload: string) {};
}

export class SignOut implements Action {
    readonly type = SIGN_OUT;
}

export type AuthActions = SignUp | SignIn | AutoSignIn | AuthenticateSuccess | AuthenticateFail | SignOut;
