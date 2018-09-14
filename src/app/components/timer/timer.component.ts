import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import {AngularFirestore} from 'angularfire2/firestore';
import {AuthService} from '../../services/auth.service';
import {MessageInputService} from '../../services/messageInput.service';


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
    private messageInputService: MessageInputService
  ) {
  }

  ngOnInit() {
  }

  public addTime() {

    const diff = +this.endTime - +this.startTime;
    this.firestore.collection('timelogs').add({
      user: this.firestore.doc('/users/' + this.authService.getCurrentAuth().user.uid).ref,
      startTime: this.startTime.toLocaleString(),
      startTimestamp: +this.startTime,
      endTime: this.endTime.toLocaleString(),
      endTimestamp: +this.endTime,
      diff: diff,
      message: this.messageInputService.messageInputValue
    }).then();
    this.startTime = null;
    this.endTime = null;
  }
}

