import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.scss']
})
export class DisplayComponent implements OnInit {

  userData?: any = {};
  userComponents?: any;
  positions?: any = [];

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
      },
      {
        "id": "empty",
        "position": 4,
        "size": [2, 1]
    }
    ];
  }

  ngOnInit(): void {
    for(let i in this.userComponents) {
      let obj: any = {};
      let key = this.userComponents.id;
      console.log(key);
      if(this.userComponents.position == 1) {
        obj[key] = "col-start-1 row-start-1";
      }
      this.positions.push(obj);
    }
    console.log(this.positions);
  }

}
