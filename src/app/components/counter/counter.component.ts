import {Component, OnDestroy, OnInit} from '@angular/core';
import {AngularFirestore, DocumentSnapshot} from 'angularfire2/firestore';
import {Timelog} from '../../models/timelog';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.css']
})
export class CounterComponent implements OnInit, OnDestroy {

  diff = 0;
  counterInterval;
  counterIsRunning = false;
  timeLogDoc: DocumentSnapshot<Timelog>;

  constructor(
    private firestore: AngularFirestore,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.authService.getAuth().subscribe((user) => {
      if (user.user) {
        const timelogs = this.firestore.collection('timelogs',
          ref => ref
            .where('user', '==', this.firestore.doc('/users/' + user.user.uid).ref)
            .orderBy('startTime', 'desc')
            .limit(1)
        );
        timelogs.valueChanges().subscribe((timelog: Timelog[]) => {
          console.log('ye', timelog);
          this.diff = +new Date() - timelog[0].startTimestamp;
          this.counterInterval = setInterval(() => {
            this.countUp();
          },  1000);
          this.counterIsRunning = true;
        });
      }
    });
  }

  ngOnDestroy() {
  }

  public async startCounter() {
    if (this.counterIsRunning === false) {
      this.counterInterval = setInterval(() => {
        this.countUp();
      },  1000);
      this.counterIsRunning = true;

      if (this.authService.getCurrentAuth().user.uid) {
        const response = await this.firestore.collection('timelogs').add({
          user: this.firestore.doc('/users/' + this.authService.getCurrentAuth().user.uid).ref, // Sådan gør man xD
          startTime: new Date().toLocaleString(),
          startTimestamp: +new Date()
        });
        const timeLogDocument = await response.get();
        this.timeLogDoc = <DocumentSnapshot<Timelog>> timeLogDocument;
      }
      return;
    }

    if (this.counterIsRunning === true) {
      clearInterval(this.counterInterval);

      this.firestore.doc(this.timeLogDoc.ref).update({
        endTime: new Date(),
        endTimestamp: +new Date(),
        diff: this.diff
      }).then();

      this.counterIsRunning = false;
      this.diff = 0;
    }
  }

  public countUp() {
    this.diff += 1000;
  }
}
