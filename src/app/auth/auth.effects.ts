
import {Effect, Actions} from '@ngrx/effects';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/mergeMap';
import {fromPromise} from 'rxjs/observable/fromPromise';
import * as firebase from 'firebase';

import { TRY_SIGNUP, TrySignup, SIGNUP, SET_TOKEN } from './store/auth.actions';

@Injectable()
export class AuthEffects {
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

    constructor(private actions$: Actions){

    }
}