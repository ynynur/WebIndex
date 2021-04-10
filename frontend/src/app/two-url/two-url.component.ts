import { Component, OnInit } from '@angular/core';
import { IWord } from '../interfaces/word.interface';
import { ParseService } from '../parse.service';

@Component({
  selector: 'app-two-url',
  templateUrl: './two-url.component.html',
  styleUrls: ['./two-url.component.scss']
})
export class TwoUrlComponent implements OnInit {
  content: any;
  link1 = '';
  link2 = '';
  words = [];

  // words: Array <Word> = []; 
  isLoading = false;
  frequency1: IWord[] = []; //array 
  frequency2: IWord[] = []; //array 

  constructor(private parseService: ParseService) {
    this.words.push([]);
    this.words.push([]);
  }

  ngOnInit(): void {
  }

  getWikipediaInfo() {
    this.parseService
      .getWikipediCompareUrls(this.link1, this.link2)
      .subscribe((data: any) => { //data type : any
        for (let i in data.response) {
          let a = data.response[i];
          const plainText = this.escapeHtml(a);
          const wordArray = this.convertResponse(plainText);
          this.countWords(wordArray, i);
        }
      });
  }

  convertResponse(response: any) {
    return response
      .split(" ")
      .map(w => {
        w = w.toLowerCase();
        w = w.replace(/[&/\#,+()$~%.'":*?<>{}]/g, '');
        return w;
      });
  }

  escapeHtml(response) {
    let div = document.createElement('div');
    div.innerText = response;
    return div.innerText
      .replace(/&#93;/g, "] ")
      .replace(/&#91;/g, " [");
  }

  countWords(wordArray: any, key: string) {
    let ind = key === 'link1' ? 0 : 1;

    // if (key === 'link1') {
    //   ind = 0;
    // } else {
    //   ind = 1;
    // }

    wordArray.forEach((element: string, index: number) => { //arrayin icindeki her bir elementi bastansona geziyoruz  
      if (index == 0) {
        let x: IWord = {
          word: element,
          count: 1,
        };
        this.words[ind].push(x);

      } else {
        let isExist = this.words[ind].find(elementt => elementt.word == element) // daha önce kelime eklenmiş mi ? 
        if (isExist) {
          isExist.count++;
        }
        else {
          let x: IWord = { //objeyi olusturudk
            word: element,
            count: 1,
          };
          this.words[ind].push(x);
        }
      }
    });
    this.calculateFrequency(ind);
  }

  calculateFrequency(ind) {
    if (ind === 0) {
      this.frequency1 = this.words[0].sort((a, b) => b.count - a.count).slice(0, 5);
    }
    else if (ind === 1) {
      this.frequency2 = this.words[1].sort((a, b) => b.count - a.count).slice(0, 5);
    }
  }
}
