import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, share } from 'rxjs';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss'],
})
export class WeatherComponent {
  weatherData!: Observable<any>;

  WEATHER_API_KEY = '9a48ea7d19a72a24440fbb791b7f0a55';
  LATITUDE = 47.398577;
  LONGITUDE = 8.599249;
  NUM_DAYS = 4;

  temperature: number;
  wind: number;
  rain: number;
  weather_icon: string;

  constructor(private http: HttpClient) {
    this.weatherData = this.http
      .get(
        `https://api.open-meteo.com/v1/forecast?latitude=${this.LATITUDE}&longitude=${this.LONGITUDE}&daily=apparent_temperature_max,apparent_temperature_min,precipitation_sum&current_weather=true&timezone=Europe%2FBerlin`
      )
      .pipe(share());
    this.weatherData.subscribe(this.parseWeatherData.bind(this));
  }


  forecast: Array<Record<string, number | string>>;

  toDayString(weekday: number): string {
    switch (weekday % 7) {
      case 0:
        return 'So';
      case 1:
        return 'Mo';
      case 2:
        return 'Di';
      case 3:
        return 'Mi';
      case 4:
        return 'Do';
      case 5:
        return 'Fr';
      default:
        return 'Sa';
    }
  }

  toSVGPath(iconID: string): string {
    iconID = iconID.replace('n', 'd');
    return `src/img/weather/${iconID}.svg`;
  }

  parseWeatherData(data: any) {
    console.log(data);

    this.temperature = Math.round(data.current_weather.temperature);
    this.wind = Math.round(data.current_weather.windspeed);
    // this.weather_icon = this.toSVGPath(data.current_weather.weathercode);

    
    this.rain = Math.round(data.daily.precipitation_sum[0]);
    
    this.forecast = [];

    for (let i = 1; i <= this.NUM_DAYS; i++) {
      const today = new Date();
      const weekday = this.toDayString(today.getDay() + i);

      const minTemperature = Math.round(data.daily.apparent_temperature_min[i]);
      const maxTemperature = Math.round(data.daily.apparent_temperature_max[i]);
      // const iconPath = this.toSVGPath(data.weather[0].icon);

      this.forecast.push({
        min: minTemperature,
        max: maxTemperature,
        weekday: weekday,
        //icon: iconPath,
      });
    }
  }
}
