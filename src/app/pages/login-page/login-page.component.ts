import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  date = new Date();
  hour: any;
  hours: any;
  minute: any;
  minutes: any;
  second: any;
  seconds: any;


  constructor(
    public AuthenticationService: AuthService
  ) { }

  ngOnInit() {
    this.hour = new Date().getHours();
    this.minute = new Date().getMinutes();
    this.second = new Date().getSeconds();
    this.hours = ('0' + this.hour).slice(-2);
    this.minutes = ('0' + this.minute).slice(-2);
    this.seconds = ('0' + this.second).slice(-2);
    setInterval(() => {
      this.console();
    },  1000);
  }
  console() {
    this.hours = new Date().getHours();
    this.minutes = new Date().getMinutes();
    this.seconds = new Date().getSeconds();
  }
}
