import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  loadedFeature = 'recipe';
  title = 'app';

  onNavigate(feature: string) {
    // console.log(`onNavigate to ${feature}`)
    this.loadedFeature = feature;
  }
}
