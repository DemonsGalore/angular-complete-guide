import { User } from '../models';
import { AuthActions, SIGN_IN, SIGN_OUT } from './auth.actions';

export interface AuthState {
    user: User;
};

const initialState: AuthState = {
    user: null
};

export function authReducer(state: AuthState = initialState, action: AuthActions): AuthState {
    switch (action.type) {
        case SIGN_IN:
            return {
                ...state,
                user: action.payload
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
