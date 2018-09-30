import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'diffToHour'
})
export class DiffToHourPipe implements PipeTransform {

  transform(value: number): number {
    const hour = value / (1000 * 60 * 60);
    return hour;
  }
}
