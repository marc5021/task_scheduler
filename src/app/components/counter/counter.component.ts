import {Component, OnDestroy, OnInit} from '@angular/core';

@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.css']
})
export class CounterComponent implements OnInit, OnDestroy {

  diff = 0;
  seconds = 0;
  minutes = 0;
  hours = 0;
  counterInterval;
  counterIsRunning = false;

  public startCounter() {
    if (this.counterIsRunning === false) {
      this.counterInterval = setInterval(() => {
        this.countUp();
      },  1000);
      this.counterIsRunning = true;
      return;
    }

    if (this.counterIsRunning === true) {
      clearInterval(this.counterInterval);
      this.counterIsRunning = false;
    }
  }

  public countUp() {
    this.diff += 1000;
    this.seconds += 1;
    if (this.seconds === 60) {
      this.minutes += 1;
      this.seconds = 0;
    }
    if (this.minutes === 60) {
      this.hours += 1;
      this.minutes = 0;
    }
  }

  constructor() {}

  ngOnInit() {
  }

  ngOnDestroy() {

  }
}
