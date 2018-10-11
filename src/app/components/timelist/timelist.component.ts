import {Component, OnInit} from '@angular/core';
import {ResourceFormatter} from '../../resources/resource-formatter.resource';
import {AngularFirestore} from 'angularfire2/firestore';
import {AuthService} from '../../services/auth.service';
import {Observable} from 'rxjs';
import {Timelog} from '../../models/timelog';
import {map, take} from 'rxjs/operators';
import {Authentication} from '../../models/authentication';


@Component({
  selector: 'app-timelist',
  templateUrl: './timelist.component.html',
  styleUrls: ['./timelist.component.css']
})
export class TimelistComponent implements OnInit {

  $timelogs: Observable<Timelog[][]>;
  user: Authentication;
  editTimelogId: string;
  constructor(
    private firestore: AngularFirestore,
    private authService: AuthService,
    private formatter: ResourceFormatter,

  ) { }

  async ngOnInit() {
    // Take(1) get empty user, Take(2) get user.
    this.user = await this.authService.getAuth().pipe(take(2)).toPromise();
    if (this.user.user) {
      this.$timelogs = this.formatter.collection('timelogs',
        ref => ref
          .where('user', '==', this.firestore.doc('/users/' + this.user.user.uid).ref)
          .orderBy('endTimestamp', 'desc')
      ).pipe( map(timeLogs => this.groupBy(timeLogs, timelog => this.getYearAndWeekNumber(timelog.data.startTimestamp))));
    }
  }

  protected groupBy = (data, keyFn) => data.reduce((agg, item) => {
    const group = keyFn(item);
    agg[group] = [...(agg[group] || []), item];
    return agg;
  }, [])

  // source: http://stackoverflow.com/questions/6117814/get-week-of-year-in-javascript-like-in-php
  private getYearAndWeekNumber(timestamp: number): string {
    // Copy date so don't modify original
    const date = new Date(timestamp);
    date.setHours(0, 0, 0);
    // Set to nearest Thursday: current date + 4 - current day number
    // Make Sunday's day number 7
    date.setDate(date.getDate() + 4 - (date.getDay() || 7));
    // Get first day of year
    const yearStart = new Date(date.getFullYear(), 0, 1);
    // Calculate full weeks to nearest Thursday
    // Return array of year and week number
    return date.getFullYear() + ' Uge: ' + Math.ceil((((date.valueOf() - yearStart.valueOf()) / 86400000) + 1) / 7);
  }
  public disabledTimelog(timelog: Timelog) {
    if (this.editTimelogId) {
      return this.editTimelogId !== timelog.ref.id;
    }
    return true;
  }

  public deleteLog(path) {
    const confirmClick = confirm('Are you sure you want to delete this TimeLog?');
      if (confirmClick === true) {
    this.firestore.doc(path).delete().then();
      }
  }

  public updateLog(timelog: Timelog) {
    this.firestore.doc(timelog.ref.path).update({
      startTime: new Date(timelog.data.startTime).toISOString(),
      startTimestamp: +new Date(timelog.data.startTime),
      endTime: new Date(timelog.data.endTime).toISOString(),
      endTimestamp: +new Date(timelog.data.endTime),
      message: timelog.data.message
    });
  }

  public updateLogState(timelogId: string) {
    this.editTimelogId = timelogId;
  }
}
