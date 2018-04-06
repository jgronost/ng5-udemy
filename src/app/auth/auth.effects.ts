
import {Effect, Actions} from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/mergeMap';
import {fromPromise} from 'rxjs/observable/fromPromise';
import * as firebase from 'firebase';

import { TRY_SIGNUP, TrySignup, SIGNUP, SET_TOKEN, TRY_SIGNIN, SIGNIN } from './store/auth.actions';

@Injectable()
export class AuthEffects {

    constructor(private actions$: Actions, private router: Router){}

    @Effect()
    authSignup = this.actions$
        .ofType(TRY_SIGNUP)
        .map((action: TrySignup) => {
            return action.payload;
        })
        .switchMap((authData: {username: string, password: string}) => {
            return fromPromise(firebase.auth().createUserWithEmailAndPassword(authData.username, authData.password));
        })
        .switchMap(() => {
            return fromPromise(firebase.auth().currentUser.getIdToken());
        })
        .mergeMap((token: string) => {
            return [
                {
                    type: SIGNUP
                },
                {
                    type: SET_TOKEN,
                    payload: token
                }
            ];
        });

    @Effect()
    authSignin = this.actions$
        .ofType(TRY_SIGNIN)
        .map((action: TrySignup) => {
            return action.payload;
        })
        .switchMap((authData: {username: string, password: string}) => {
            return fromPromise(firebase.auth().signInWithEmailAndPassword(authData.username, authData.password));
        })
        .switchMap(() => {
            return fromPromise(firebase.auth().currentUser.getIdToken());
        })
        .mergeMap((token: string) => {
            this.router.navigate(['/']);
            return [
                {
                    type: SIGNIN
                },
                {
                    type: SET_TOKEN,
                    payload: token
                }
            ];
        });

}