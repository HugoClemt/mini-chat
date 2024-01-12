import { Pipe, PipeTransform } from '@angular/core';

let input = "Le lien pour la formation https://laformation.fr a+"
let output = "Le lien pour la formation <a href='https://laformation.fr'>https://laformation.fr</a> a+"

@Pipe({
  name: 'parseLink',
  standalone: true
})
export class ParseLinkPipe implements PipeTransform {

  transform(message: string, ...args: unknown[]): string {

    let stringArray = message.split(' ');

    return stringArray.map(word => {
      return word.includes('https://') ? `<a href='${word}' target="_blanck">${word}</a>` : word;
    }).join(' ');
  }

}
