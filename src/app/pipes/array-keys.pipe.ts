import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'arrayKeys'
})
export class ArrayKeysPipe implements PipeTransform {

  transform(value: any[]): string[] {
    return Object.keys(value);
  }

}
