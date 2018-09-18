import { Component, OnInit } from '@angular/core';
import {ResourceFormatter} from '../../resources/resource-formatter.resource';
import {AngularFirestore} from 'angularfire2/firestore';
import {AuthService} from '../../services/auth.service';
import {Observable
} from 'rxjs';
import {Timelog} from '../../models/timelog';
import {take} from 'rxjs/operators';
import {Authentication} from '../../models/authentication';



@Component({
  selector: 'app-timelist',
  templateUrl: './timelist.component.html',
  styleUrls: ['./timelist.component.css']
})
export class TimelistComponent implements OnInit {

  timelogs: Observable<Timelog[]>;
  user: Authentication;
  timeLogPath: any;

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
          .where('user', '==', this.firestore.doc('/users/' + this.user.user.uid).ref)
          .orderBy('endTime', 'desc')
      );
    }
  }
  public deleteLog(path) {
    const confirmClick = confirm('Are you sure you want to delete this TimeLog?');
      if (confirmClick === true) {
    this.firestore.doc(path).delete().then();
      }
  }
}
