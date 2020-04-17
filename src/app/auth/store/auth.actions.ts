import { Action } from '@ngrx/store';

import { User } from '../models';

export const SIGN_IN = '[Auth] Sign In';
export const SIGN_OUT = '[Auth] Sign Out';

export class SignIn implements Action {
    readonly type = SIGN_IN;
    constructor(public payload: User) {}
}

export class SignOut implements Action {
    readonly type = SIGN_OUT;
}

export type AuthActions = SignIn | SignOut;
