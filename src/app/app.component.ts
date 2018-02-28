import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  loadedFeature = 'recipe';
  title = 'app';

  ngOnInit(): void {
    firebase.initializeApp({
      apiKey: "AIzaSyANtqwyL04N9ZYtZk1GE7EGan2q5xqEXfc",
      authDomain: "jgronost-udemy-recipe-book.firebaseapp.com"
    });
  }

}
