import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TimerComponent implements OnInit {

    public dateTime1: Date;

    public dateTime2: Date;

    public dateTime3: Date;

    constructor() { }

  ngOnInit() {
  }

}

