import { Action } from '@ngrx/store';

export const TRY_SIGNUP = 'TRY_SIGNUP';
export const TRY_SIGNIN = 'TRY_SIGNIN';
export const TRY_LOGOUT = 'TRY_LOGOUT';
export const SIGNUP = 'SIGNUP';
export const SIGNIN = 'SIGNIN';
export const LOGOUT = 'LOGOUT';
export const SET_TOKEN = 'SET_TOKEN';

export class TryLogout implements Action {
    readonly type = TRY_LOGOUT;
    
    constructor(public payload: any = null) {}
}

export class TrySignin implements Action {
    readonly type = TRY_SIGNIN;

    constructor(public payload: {username: string, password: string}) {}
}

export class TrySignup implements Action {
    readonly type = TRY_SIGNUP;

    constructor(public payload: {username: string, password: string}) {}
}

export interface AuthAction extends Action {
    payload? : string;
}

export class Signup implements AuthAction {
    type = SIGNUP;

    constructor(public payload: any = null) {}
}

export class Signin implements AuthAction {
    type = SIGNIN;

    constructor(public payload: any = null) {}
}

export class Logout implements AuthAction {
    type = LOGOUT;

    constructor(public payload: any = null) {}
}

export class SetToken implements AuthAction {
    type = SET_TOKEN;

    constructor(public payload: string) {}
}

export type AuthActions = Signup | Signin | Logout | SetToken | TrySignup | TrySignin | TryLogout;