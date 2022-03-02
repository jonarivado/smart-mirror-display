import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ClockComponent } from './components/clock/clock.component';
import { DisplayComponent } from './display/display.component';
import { WeatherComponent } from './components/weather/weather.component';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';

import { environment } from '../environments/environment';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { HttpClientModule } from '@angular/common/http';

import { WeatherdataService } from './services/weatherdata.service';
import { SbbComponent } from './components/sbb/sbb.component';
import { MemesComponent } from './components/memes/memes.component';

@NgModule({
  declarations: [
    AppComponent,
    ClockComponent,
    DisplayComponent,
    WeatherComponent,
    SbbComponent,
    MemesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    HttpClientModule
  ],
  providers: [WeatherdataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
