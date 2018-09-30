import { Component, OnInit } from '@angular/core';
import {map, take} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {Timelog} from '../../models/timelog';
import {Authentication} from '../../models/authentication';
import {AngularFirestore} from 'angularfire2/firestore';
import {AuthService} from '../../services/auth.service';
import {ResourceFormatter} from '../../resources/resource-formatter.resource';

@Component({
  selector: 'app-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.css']
})
export class ProgressBarComponent implements OnInit {

  timelogs: Observable<Timelog[]>;
  user: Authentication;
  total: number;

  constructor(
    private firestore: AngularFirestore,
    private authService: AuthService,
    private formatter: ResourceFormatter,

  ) { }

  async ngOnInit() {
    this.user = await this.authService.getAuth().pipe(take(2)).toPromise();
    if (this.user.user) {
      this.timelogs = this.formatter.collection('timelogs',
        ref => ref
          .where('startTimestamp', '>=', +this.getMonday(new Date()))
          .where('user', '==', this.firestore.doc('/users/' + this.user.user.uid).ref)
          .orderBy('startTimestamp', 'desc')
      ).pipe(
        map((value: Timelog[]) => {
          let newTotal = 0;

          value.forEach((item) => {
            if (item.data.diff) {
              newTotal += item.data.diff;
            }
          });

          this.total = newTotal;

          return value;
        })
      );
    }
  }

  private getMonday(date) {
    date = new Date(date);
    const day = date.getDay();
    const diff = date.getDate() - day + (day === 0 ? -6 : 1); // adjust when day is sunday
    return new Date(date.setDate(diff));
  }
}
