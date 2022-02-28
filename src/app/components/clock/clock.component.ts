import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-clock',
  templateUrl: './clock.component.html',
  styleUrls: ['./clock.component.scss'],
})
export class ClockComponent {
  @Input() type?: string = '';

  hours: string;
  minutes: string;
  
  ngAfterViewInit() {
    this.refreshTime();
    setInterval(() => {
      this.refreshTime();
    }, 1000);
  }
  
  refreshTime() {
    const now = new Date();

    this.hours = now.getHours().toString();
    this.minutes = now.getMinutes().toString();
    
    if (this.minutes.length == 1) {
      this.minutes = "0" + this.minutes;
    }
  }
}
