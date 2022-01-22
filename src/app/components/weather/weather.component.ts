import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss']
})
export class WeatherComponent implements OnInit {

  weatherData?: any;

  constructor(private http:HttpClient) { 
    this.http.get('https://api.open-meteo.com/v1/forecast?latitude=52.5235&longitude=13.4115&daily=temperature_2m_max,temperature_2m_min&current_weather=true&timezone=Europe%2FBerlin')
    .subscribe(data => {
      this.weatherData = data;
      console.log(this.weatherData);
    });
  }

  ngOnInit(): void {
    

  }
  ngAfterViewInit() {
  }

}
