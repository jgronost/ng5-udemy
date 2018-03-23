import { AuthActions, SIGNUP, SIGNIN, LOGOUT } from "./auth.actions";

export interface AuthState {
    token: string,
    authenticated: boolean
}

const initalState: AuthState = {
    token: null,
    authenticated: false
};

export function authReducers(state = initalState, action: AuthActions) {
    switch (action.type) {
        case SIGNUP:
        case SIGNIN:
            return {
                ...state,
                authenticated: true
            };
        case LOGOUT:
            return {
                ...state,
                authenticated: false
            };
        default:
            return state;
    }
}