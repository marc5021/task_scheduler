import {Component, OnDestroy, OnInit} from '@angular/core';
import {AngularFirestore} from 'angularfire2/firestore';
import {Timelog} from '../../models/timelog';
import {AuthService} from '../../services/auth.service';
import {ResourceFormatter} from '../../resources/resource-formatter.resource';
import {Subscription} from 'rxjs';
import {MessageInputService} from '../../services/messageInput.service';
import {Favicons} from '../../services/favicon.service';

@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.css']
})
export class CounterComponent implements OnInit, OnDestroy {

  diff = 0;
  counterInterval;
  counterIsRunning = false;
  timeLogPath: any;
  hasCheckForRunning = false;
  userSub: Subscription;
  timelogSub: Subscription;
  messageInput = '';
  missingMessage: any;
  constructor(
    private firestore: AngularFirestore,
    private authService: AuthService,
    private formatter: ResourceFormatter,
    private messageInputService: MessageInputService,
    private favicons: Favicons
  ) {}

  ngOnInit() {
    this.resetFavicon();

    this.userSub = this.authService.getAuth().subscribe((user) => {
      if (user.user && !this.hasCheckForRunning) {
        const timelogs = this.formatter.collection('timelogs',
          ref => ref
            .where('user', '==', this.firestore.doc('/users/' + user.user.uid).ref)
            .orderBy('startTime', 'desc')
            .limit(1)
        );
        let hasBeenCheck = false;
        this.timelogSub = timelogs.subscribe((timelog: Timelog[]) => {
          if (timelog.length !== 0 && !hasBeenCheck && !timelog[0].data.endTime) {
            this.diff = +new Date() - timelog[0].data.startTimestamp;
            this.startCounter(timelog[0].ref.path).then();
          }
          hasBeenCheck = true;
        });
        this.hasCheckForRunning = true;
      }
    });
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
    this.timelogSub.unsubscribe();
  }

  public toggleCounter() {
    if (this.counterIsRunning) {
      this.stopCounter();
    } else {
      this.startCounter().then();
    }
  }

  private async startCounter(timelogPath = null) {
    this.useFavicon('greenClock');
    this.counterInterval = setInterval(() => {
      this.countUp();
    },  1000);
    this.counterIsRunning = true;

    if (this.authService.getCurrentAuth().user.uid) {

      let timeLogDocument;
      if (timelogPath) {
        this.timeLogPath = timelogPath;

      } else {
        const response = await this.firestore.collection('timelogs').add({
          user: this.firestore.doc('/users/' + this.authService.getCurrentAuth().user.uid).ref,
          startTime: new Date().toISOString(),
          startTimestamp: new Date()
        });
        timeLogDocument = await response.get();
        this.timeLogPath = timeLogDocument.ref;
      }

    }
    return;
  }

  private stopCounter() {
    if (!this.messageInput) {
      document.getElementById('messageInputId').setAttribute('id', 'errorMessage');
      return;
    }
    this.useFavicon('blackClock');
    clearInterval(this.counterInterval);
    this.firestore.doc(this.timeLogPath).update({
      endTime: new Date().toISOString(),
      endTimestamp: +new Date(),
      diff: this.diff,
      message: this.messageInputService.messageInputValue
    }).then();

    this.counterIsRunning = false;
    this.diff = 0;
    this.messageInput = '';
  }

  // I reset the favicon to use the "default" item.
  public resetFavicon(): void {
    this.favicons.reset();
  }

  // I activate the favicon with the given name.
  public useFavicon( name: string ): void {
    // Notice that we don't need to know anything about how the favicon is defined;
    // not URLs, no image types - just the identifier. All of the implementation
    // details have been defined at bootstrap time.
    this.favicons.activate( name );

  }

  public updateMessageValue() {
    this.messageInputService.setMessageValue(this.messageInput);
  }

  public countUp() {
    this.diff += 1000;
  }
}
