import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'smart-mirror-display';

  userData?: any = {};
  userComponents?: any;
  positions?: any = [];

  time: any = true;

  constructor() {
    this.userData = {
      "name": "Anna",
      "birthday": "1920-01-01T00:00:0.000Z",
      "mailAddress": "anna.sulzer@shinternet.ch"
    };

    this.userComponents = [
        {
            "id": "weather",              // response depends on the component type, feel free to change 
            "position": 1,
            "size": [2, 1],
            "locationString": "Dübendorf"
        },
        {
            "id": "clock",
            "position": 2,
            "size": [2, 1],
            "clockType": "analog"
        },
        {
          "id": "empty",
          "position": 3,
          "size": [2, 1]
      }
    ];
  }

}
