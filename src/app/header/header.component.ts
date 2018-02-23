import { Component, OnInit } from '@angular/core';
import { Response } from '@angular/http';
import { DataStorageService } from '../shared/data-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  constructor(private dataStorage: DataStorageService) { }

  ngOnInit() {
  }

  onSaveData() {
    this.dataStorage.storeRecipes().subscribe((response: Response) => {
      console.log(response);
    });
  }

}
