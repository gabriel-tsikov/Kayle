import { Pipe, PipeTransform } from '@angular/core';


@Pipe({
  name: 'shorten',
})
export class ShortenPipe implements PipeTransform {
  transform(value: string, length: number, elipses: string): string {
    const biggestWord = 30;

    if (typeof value === 'undefined') {
      return value;
    }
    if (value.length <= length) {
      return value;
    }

    let shortenedText = value.slice(0, length + biggestWord);

    while (shortenedText.length > length - elipses.length) {
      const lastSpace = shortenedText.lastIndexOf(' ');
      if (lastSpace === -1) {
        break;
      }
      shortenedText = shortenedText
        .slice(0, lastSpace)
        .replace(/[!,.?;:]$/, '');
    }
    return shortenedText + elipses;
  }
}
