import { Pipe, PipeTransform } from '@angular/core';


@Pipe({
  name: 'unescape'
})
export class UnescapePipe implements PipeTransform {

  transform(text: string): string {
    text = unescape(text);
    return text;
  }
}
