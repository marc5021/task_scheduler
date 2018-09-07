import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'clockfomatter'
})
export class ClockfomatterPipe implements PipeTransform {
  // transform number like 2 to string like 02
  // Input: 502110
  // Output: 00:08:22
  transform(value: number): string {
    const hour = Math.floor(value / (1000 * 60 * 60));
    const minutes = Math.floor( (value - hour * 1000 * 60 * 60) / (1000 * 60));
    const seconds = Math.floor( (value - minutes * 1000 * 60) / 1000);
    return ('0' + hour).slice(-2) + ':' + ('0' + minutes).slice(-2) + ':' +  ('0' + seconds).slice(-2);
  }

}
