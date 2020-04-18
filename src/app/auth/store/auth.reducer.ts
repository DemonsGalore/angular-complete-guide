import { User } from '../models';
import { AuthActions, SIGN_IN, SIGN_OUT, AUTHENTICATE_FAIL, AUTHENTICATE_SUCCESS, SIGN_UP } from './auth.actions';

export interface AuthState {
    user: User;
    authError: string;
    loading: boolean;
};

const initialState: AuthState = {
    user: null,
    authError: null,
    loading: false
};

export function authReducer(state: AuthState = initialState, action: AuthActions): AuthState {
    switch (action.type) {
        case SIGN_UP:
        case SIGN_IN:
            return {
                ...state,
                authError: null,
                loading: true
            };
        case AUTHENTICATE_SUCCESS:
            return {
                ...state,
                user: action.payload,
                loading: false
            };
        case AUTHENTICATE_FAIL:
            return {
                ...state,
                user: null,
                authError: action.payload,
                loading: false
            };
        case SIGN_OUT:
            return {
                ...state,
                user: null
            };
        default:
            return state;
    }
}
