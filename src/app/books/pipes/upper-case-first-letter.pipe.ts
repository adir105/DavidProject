import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'upperCaseFirstLetter'
})
export class UpperCaseFirstLetterPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    
    let englishLettersStr: string = this.removeNonEnglishLetters(value);    
    let str = englishLettersStr.split(' ', 100);
    let newStr = "";
    
    str.forEach(word => {
      let letter = word[0].toUpperCase();
      newStr = newStr + letter + word.slice(1).toLocaleLowerCase() + " ";
    });
    return newStr;
  }

  removeNonEnglishLetters(str: string){
    let newStr = str;

    for(let i = 0; i< str.length; i++){
      let char = str.charCodeAt(i);
      if(char < 65 || char > 122 || (char > 90 && char < 97)){
        if(char === 32){
            continue;
        }
        newStr = newStr.replace(str.charAt(i), '');
      }
    }
    return newStr;
  }
}
