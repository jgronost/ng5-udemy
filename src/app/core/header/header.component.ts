import { Component, OnInit } from '@angular/core';
import { Response } from '@angular/http';
import { Store } from '@ngrx/store';

import { DataStorageService } from '../../shared/data-storage.service';
import { AppState } from '../../store/app.reducers';
import { Observable } from 'rxjs/Observable';
import { AuthState } from '../../auth/store/auth.reducers';
import { TryLogout } from '../../auth/store/auth.actions';
import {FetchRecipes} from '../../recipes/store/recipe.actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  authState: Observable<AuthState>;

  constructor(private dataStorage: DataStorageService,
              private store: Store<AppState>) { }

  ngOnInit() {
    this.authState = this.store.select('auth');
  }

  onSaveData() {
    this.dataStorage.storeRecipes().subscribe((response: Response) => {
      console.log(response);
    });
  }

  onFetchData() {
    this.store.dispatch(new FetchRecipes());
  }

  onLogout() {
    this.store.dispatch(new TryLogout());
  }

}
