import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-clock',
  templateUrl: './clock.component.html',
  styleUrls: ['./clock.component.scss'],
})
export class ClockComponent implements OnInit {
  @Input() type?: string = '';

  time: any;
  data: any;

  refreshTime() {
    
  }

  ngAfterViewInit() {
    this.refreshTime();
    setInterval(() => {
      this.refreshTime();
    }, 1000);
  }
  constructor() {}

  ngOnInit(): void {}
}
