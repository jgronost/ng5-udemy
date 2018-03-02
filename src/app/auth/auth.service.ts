import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { Router } from '@angular/router';

@Injectable()
export class AuthService {
  private token: string;
  constructor(private router: Router) { }

  signupUser(email: string, password: string) {
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .catch(error => console.log(error));
  }

  signinUser(email: string, password: string) {
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(response => {
        console.log(response);
        firebase.auth().currentUser.getToken()
          .then((token: string) => {
            this.token = token;
            this.router.navigate(['/']);
          });
      })
      .catch(error => console.log(error));
  }

  logout() {
    this.token = null;
    firebase.auth().signOut();
    this.router.navigate(['/']);
  }

  getToken() {
    firebase.auth().currentUser.getToken()
      .then((token: string) => this.token = token);
      //FIXME might not work in certain circumstances
    return this.token;
  }

  isAuthenticated() {
    return this.token != null;
  }
}
