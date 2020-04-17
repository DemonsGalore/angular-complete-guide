import { User } from '../models';

export interface AuthState {
    user: User;
};

const initialState: AuthState = {
    user: null
};

export function authReducer(state: AuthState = initialState, action): AuthState {
    return state;
}
