import { Component, OnInit } from '@angular/core';
import { FireAuthService } from '../services/fireauth.service';
import { FirestoreService, IComponent } from 'src/app/services/firestore.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.scss'],
})
export class DisplayComponent implements OnInit {
  userComponents: IComponent[];  

  constructor(
    private authService: FireAuthService,
    private firestoreService: FirestoreService
  ) {
    this.userComponents = [];
  }

  augmentComponentClasses() {
    for (const component of this.userComponents) {   
      let classes;
      
      switch (+component.position) {
        case 1:
          classes = 'col-start-1 row-start-1';
          break;
        case 2:
          classes = 'col-start-2 row-start-1';
          break;
        case 3:
          classes = 'col-start-3 row-start-1';
          break;
        case 4:
          classes = 'col-start-1 row-start-2';
          break;
        case 5:
          classes = 'col-start-2 row-start-2';
          break;
        case 6:
          classes = 'col-start-3 row-start-2';
          break;
        default:          
          console.log(component.position == 2)
      }

      component.classes = classes;
    }
  }

  async ngOnInit(): Promise<void> {
    if (localStorage.getItem('user')) {
      this.subscribe();
    } else {
      await this.authService.login();
      this.subscribe();
    }
  }

  subscribe(): void {    
    this.firestoreService.getAll()?.subscribe((data) => {
      this.userComponents = data;
      this.augmentComponentClasses();      
    });
  }
}
