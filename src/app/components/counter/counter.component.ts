import {Component, OnDestroy, OnInit} from '@angular/core';
import {AngularFirestore, DocumentSnapshot} from 'angularfire2/firestore';
import {Timelog} from '../../models/timelog';
import {AuthService} from '../../services/auth.service';
import {ResourceFormatter} from '../../resources/resource-formatter.resource';

@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.css']
})
export class CounterComponent implements OnInit, OnDestroy {

  diff = 0;
  counterInterval;
  counterIsRunning = false;
  timeLogRef: any;
  hasCheckForRunning = false;

  constructor(
    private firestore: AngularFirestore,
    private authService: AuthService,
    private formatter: ResourceFormatter,
  ) {}

  ngOnInit() {
    this.authService.getAuth().subscribe((user) => {
      if (user.user && !this.hasCheckForRunning) {
        const timelogs = this.formatter.collection('timelogs',
          ref => ref
            .where('user', '==', this.firestore.doc('/users/' + user.user.uid).ref)
            .orderBy('startTime', 'desc')
            .limit(1)
        );
        let hasBeenCheck = false;
        timelogs.subscribe((timelog: Timelog[]) => {
          if (timelog.length !== 0 && !hasBeenCheck) {
            console.log('timelog from init', timelog);
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
  }

  public toggleCounter() {
    if (this.counterIsRunning) {
      this.stopCounter();
    } else {
      this.startCounter().then();
    }
  }

  private async startCounter(timelogPath = null) {
    this.counterInterval = setInterval(() => {
      this.countUp();
    },  1000);
    this.counterIsRunning = true;

    if (this.authService.getCurrentAuth().user.uid) {

      let timeLogDocument;
      if (timelogPath) {
        timeLogDocument = await new Promise(((resolve, reject) => {
          this.formatter.doc(timelogPath).subscribe((response) => {
            resolve(response);
          });
        }));
        this.timeLogRef = timeLogDocument.ref.path;

      } else {
        const response = await this.firestore.collection('timelogs').add({
          user: this.firestore.doc('/users/' + this.authService.getCurrentAuth().user.uid).ref,
          startTime: new Date().toLocaleString(),
          startTimestamp: +new Date()
        });
        timeLogDocument = await response.get();
        this.timeLogRef = timeLogDocument.ref;
      }

    }
    return;
  }

  private stopCounter() {
    clearInterval(this.counterInterval);
    console.log(this.timeLogRef);
    this.firestore.doc(this.timeLogRef).update({
      endTime: new Date().toLocaleString(),
      endTimestamp: +new Date(),
      diff: this.diff
    }).then();
    console.log('stop');

    this.counterIsRunning = false;
    this.diff = 0;
  }

  public countUp() {
    this.diff += 1000;
  }
}
