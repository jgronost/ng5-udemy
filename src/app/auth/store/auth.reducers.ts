
export interface AuthState {
    token: string,
    authenticated: boolean
}

const initalState: AuthState = {
    token: null,
    authenticated: false
};

export function authReducers(state, action) {
    return state;
}