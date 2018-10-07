import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { environment } from '../environments/environment';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ItemsComponent } from './components/items/items.component';

import { ItemService } from './services/item.service';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import {AuthService} from './services/auth.service';
import {OWL_DATE_TIME_FORMATS, OwlDateTimeModule, OwlNativeDateTimeModule} from 'ng-pick-datetime';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { TimerComponent } from './components/timer/timer.component';
import {FormsModule} from '@angular/forms';
import { CounterComponent } from './components/counter/counter.component';
import { ClockfomatterPipe } from './pipes/clockfomatter.pipe';
import { MainPageComponent } from './pages/main-page/main-page.component';
import {MatButtonModule, MatIconModule, MatProgressBarModule, MatToolbarModule} from '@angular/material';
import { TimelistComponent } from './components/timelist/timelist.component';
import {BROWSER_FAVICONS_CONFIG, BrowserFavicons, Favicons} from './services/favicon.service';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ProgressBarComponent } from './components/progress-bar/progress-bar.component';
import { DiffToHourPipe } from './pipes/diff-to-hour.pipe';
import { LoginClockPipe } from './pipes/login-clock.pipe';
import { ArrayKeysPipe } from './pipes/array-keys.pipe';

// learn more about this from
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DateTimeFormat
export const OWL_FORMATS = {
  fullPickerInput: {year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric', hour12: false},
  datePickerInput: {year: 'numeric', month: 'numeric', day: 'numeric', hour12: false},
  timePickerInput: {hour: 'numeric', minute: 'numeric', hour12: false},
  monthYearLabel: {year: 'numeric', month: 'short'},
  dateA11yLabel: {year: 'numeric', month: 'long', day: 'numeric'},
  monthYearA11yLabel: {year: 'numeric', month: 'long'},
};

@NgModule({
  declarations: [
    AppComponent,
    ItemsComponent,
    LoginPageComponent,
    TimerComponent,
    CounterComponent,
    ClockfomatterPipe,
    MainPageComponent,
    TimelistComponent,
    NavbarComponent,
    ProgressBarComponent,
    DiffToHourPipe,
    LoginClockPipe,
    ArrayKeysPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase, 'angularfs'),
    AngularFirestoreModule,
    AngularFireAuthModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatProgressBarModule,
    FormsModule,

  ],
  providers: [
    ItemService,
    AuthService,
    CounterComponent,
    {provide: OWL_DATE_TIME_FORMATS, useValue: OWL_FORMATS},
    // The Favicons is an abstract class that represents the dependency-injection
    // token and the API contract. THe BrowserFavicon is the browser-oriented
    // implementation of the service.
    {
      provide: Favicons,
      useClass: BrowserFavicons
    },
    // The BROWSER_FAVICONS_CONFIG sets up the favicon definitions for the browser-
    // based implementation. This way, the rest of the application only needs to know
    // the identifiers (ie, "happy", "default") - it doesn't need to know the paths
    // or the types. This allows the favicons to be modified independently without
    // coupling too tightly to the rest of the code.
    {
      provide: BROWSER_FAVICONS_CONFIG,
      useValue: {
        icons: {
          'blackClock': {
            type: 'image/png',
            href: './assets/images/BlackClock128x128.png',
            isDefault: true
          },
          'greenClock': {
            type: 'image/png',
            href: './assets/images/GreenClock128x128.png'
          }
        },

        // I determine whether or not a random token is auto-appended to the HREF
        // values whenever an icon is injected into the document.
        cacheBusting: true
      }
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
