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
import {OwlDateTimeModule, OwlNativeDateTimeModule} from 'ng-pick-datetime';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { TimerComponent } from './components/timer/timer.component';
import {FormsModule} from '@angular/forms';
import { CounterComponent } from './components/counter/counter.component';
import { ClockfomatterPipe } from './pipes/clockfomatter.pipe';
import { MainPageComponent } from './pages/main-page/main-page.component';
import {MatButtonModule, MatIconModule, MatToolbarModule} from '@angular/material';
import { TimelistComponent } from './components/timelist/timelist.component';



@NgModule({
  declarations: [
    AppComponent,
    ItemsComponent,
    LoginPageComponent,
    TimerComponent,
    CounterComponent,
    ClockfomatterPipe,
    MainPageComponent,
    TimelistComponent
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
    FormsModule
  ],
  providers: [
    ItemService,
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
