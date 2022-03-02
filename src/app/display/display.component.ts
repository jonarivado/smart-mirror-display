import { AfterContentInit, Component, OnInit } from '@angular/core';
import { FireAuthService } from '../services/fireauth.service';
import { FirestoreService, IComponent } from 'src/app/services/firestore.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.scss'],
})
export class DisplayComponent implements AfterContentInit {
  userComponents: IComponent[];  
  emptyPositions: IComponent[];
  signedOut: boolean;

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
      }

      classes += ` row-span-${component.height} col-span-${component.width}`
      
      component.classes = classes;
    }
    this.emptyPositions = Array(6-this.userComponents.length).fill(0);
  }

  async ngAfterContentInit(): Promise<void> {    
    this.signedOut = true;

    if (localStorage.getItem('user')) {
      this.subscribe();
      this.signedOut = false;
    } else {
      await this.authService.storeUser();
      
      if (localStorage.getItem('user')) {
        this.signedOut = false;
        this.subscribe();
      }
    }
  }

  async login(): Promise<void> {
    this.authService.login();
  }

  subscribe(): void {
    this.firestoreService.getAll()?.subscribe((data) => {
      this.userComponents = data;
      this.augmentComponentClasses();      
    });
  }
}
