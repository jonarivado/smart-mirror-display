import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-sbb',
  templateUrl: './sbb.component.html',
  styleUrls: ['./sbb.component.scss']
})

export class SbbComponent implements OnInit {

  @Input() start: string;
  @Input() destinations: any;

  connections: any = [];

  constructor() { }

  async ngOnInit(): Promise<void> {
    for (let i = 0; i < this.destinations.length; i++) {
      let currentConnection: Record<string, any> = {};
      let sbbTimes = await this.getSbbDepartures(this.destinations[i]);
      currentConnection['departure'] = sbbTimes[0];
      currentConnection['arrival'] = sbbTimes[1];
      currentConnection['delay'] = sbbTimes[2];
      currentConnection['destination'] = this.destinations[i];
      this.connections.push(currentConnection);
    }
  }

  formatTimeString(timeString:any ) {
    // convert datestring to make it compatible with safari
    timeString = timeString.replace(/-/g, "/");
    timeString = timeString.replace(/T/g, " ");
    timeString = timeString.substring(0, timeString.length - 5);
  
    const date = new Date(Date.parse(timeString));
  
    let formatOptions: any = { hour: "2-digit", minute: "2-digit" };
    return date.toLocaleString("de-CH", formatOptions);
  }
  
  getDelay(planned:any, predicted:any) {
    const msPlanned = Date.parse(planned);
    const msPredicted = Date.parse(predicted);
  
    const delay = Math.round((msPredicted - msPlanned) / 1000 / 60);
  
    if (delay > 0) return `+${delay}`;
    else return `${delay}`;
  }

  async getSbbDepartures(destination:any) {
    const url = `https://transport.opendata.ch/v1/connections?from=${this.start}&to=${destination}`;
    const response = await fetch(url);
    const data = await response.json();
    const nextConnection = data.connections[0];
    const plannedDeparture = nextConnection.from.departure;
    const plannedArrival = nextConnection.to.arrival;
    const predictedDeparture = nextConnection.from.prognosis.departure;
    console.log(this.formatTimeString(plannedDeparture));
    return new Array(this.formatTimeString(plannedDeparture), this.formatTimeString(plannedArrival), this.getDelay(plannedDeparture, predictedDeparture));
  }

}
