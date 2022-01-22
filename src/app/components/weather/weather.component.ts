import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay, share } from 'rxjs/operators';
@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss']
})
export class WeatherComponent implements OnInit {

  weatherData!: Observable<any>;
  weatherIcon!: string;
  getWeatherIcon(weatherCode: number) {
    switch (weatherCode) {
      case 25:
        this.weatherIcon = 'wi-day-sunny';
        break;
    }
  }

  constructor(private http:HttpClient) { 
    this.weatherData = this.http.get('https://api.open-meteo.com/v1/forecast?latitude=52.5235&longitude=13.4115&daily=temperature_2m_max,temperature_2m_min&current_weather=true&timezone=Europe%2FBerlin')
    .pipe(share());
    this.weatherData.subscribe(data => {
      if (data.current_weather.weathercode == 2) {
        this.weatherIcon = 'wi-day-sunny';
      }
    });
  }

  ngOnInit(): void {
    

  }
  ngAfterViewInit() {
  }

}
