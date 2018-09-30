import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'loginClock'
})
export class LoginClockPipe implements PipeTransform {

  transform(value: number): string {
    return ('0' + value).slice(-2);
  }

}
