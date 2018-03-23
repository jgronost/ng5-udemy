import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AuthState } from './store/auth.reducers';
import { Signup, Signin, SetToken, Logout } from './store/auth.actions';

@Injectable()
export class AuthService {
  constructor(private router: Router, private store: Store<AuthState>) { }

  signupUser(email: string, password: string) {
    firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(user => {
      this.store.dispatch(new Signup());
      firebase.auth().currentUser.getToken()
      .then((token: string) => {
        this.store.dispatch(new SetToken(token));
        this.router.navigate(['/']);
      });
    })
    .catch(error => console.log(error));
  }

  signinUser(email: string, password: string) {
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(response => {
        console.log(response);
        this.store.dispatch(new Signin());
        firebase.auth().currentUser.getToken()
          .then((token: string) => {
            this.store.dispatch(new SetToken(token));
            this.router.navigate(['/']);
          });
      })
      .catch(error => console.log(error));
  }

  logout() {
    firebase.auth().signOut();
    this.store.dispatch(new Logout());
    this.router.navigate(['/']);
  }
}
