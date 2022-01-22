import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ClockComponent } from './components/clock/clock.component';
import { DisplayComponent } from './display/display.component';
import { WeatherComponent } from './components/weather/weather.component';

import { WeatherdataService } from './services/weatherdata.service';

@NgModule({
  declarations: [
    AppComponent,
    ClockComponent,
    DisplayComponent,
    WeatherComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [WeatherdataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
