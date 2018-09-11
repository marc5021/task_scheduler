import { Component } from '@angular/core';
import {AngularFireAuth} from 'angularfire2/auth';
import {AuthService} from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ng6';
  constructor(
    public fireAuth: AngularFireAuth,
    public AuthenticationService: AuthService
    ) { }
}
