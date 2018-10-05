import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import {AngularFirestore} from 'angularfire2/firestore';
import {AuthService} from '../../services/auth.service';
import {MessageInputService} from '../../services/messageInput.service';
import {CounterComponent} from '../counter/counter.component';


@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TimerComponent implements OnInit {

  public startTime: Date;
  public endTime: Date;

  constructor(
    private firestore: AngularFirestore,
    private authService: AuthService,
    private messageInputService: MessageInputService,
    public counter: CounterComponent
  ) {
  }

  ngOnInit() {
  }

  public addTime() {
  if (!this.messageInputService.messageInputValue) {
    this.counter.errorMessage();
  } else {
    this.counter.noErrorMessage();
  }

  if (!this.startTime) {
    this.errorMessageST();
  } else if (this.startTime) {
    this.noErrorMessageST();
  }

  if (!this.endTime) {
      this.errorMessageET();
  } else if (this.endTime) {
    this.noErrorMessageET();
  }

    const diff = +this.endTime - +this.startTime;
    this.firestore.collection('timelogs').add({
      user: this.firestore.doc('/users/' + this.authService.getCurrentAuth().user.uid).ref,
      startTime: this.startTime.toISOString(),
      startTimestamp: +this.startTime,
      endTime: this.endTime.toISOString(),
      endTimestamp: +this.endTime,
      diff: diff,
      message: this.messageInputService.messageInputValue
    }).then();
    this.startTime = null;
    this.endTime = null;
    this.messageInputService.setMessageValue('');
  }

  public errorMessageST() {
    document.getElementById('startTime').setAttribute('id', 'errorMessageST');
  }
  public errorMessageET() {
    document.getElementById('endTime').setAttribute('id', 'errorMessageET');
  }
  public noErrorMessageST() {
    document.getElementById('errorMessageST').setAttribute('id', 'startTime');
  }
  public noErrorMessageET() {
    document.getElementById('errorMessageET').setAttribute('id', 'endTime');
  }
}

