import { Component, OnInit } from '@angular/core';
import { IWord } from '../interfaces/word.interface';
import { ParseService } from '../parse.service';

@Component({
  selector: 'app-keyword',
  templateUrl: './keyword.component.html',
  styleUrls: ['./keyword.component.scss']
})
export class KeywordComponent implements OnInit {
  title = 'frontend';
  content: any;
  link = '';
  words: IWord[] = []; //array 
  // words: Array <Word> = []; 
  isLoading = false;
  frequency: IWord[] = []; //array 

  constructor(private parseService: ParseService) { }

  ngOnInit(): void {
  }

  getWikipediaInfo() {
    this.isLoading = true;
    this.parseService
      .getWikipediaInfo(this.link)
      .subscribe(
        (data: any) => { //data type : any 
          this.content = this.escapeHtml(data.response);
          const wordArray = this.convertResponse(this.content);
          this.countWords(wordArray);
          this.isLoading = false;
        },
        (error) => {
          this.isLoading = false;
        }
      );
  }

  convertResponse(response: any) {
    return response.split(" ").map(w => {
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

  countWords(wordArray: any) {
    wordArray.forEach((element: string, index) => { //arrayin icindeki her bir elementi bastansona geziyoruz  
      if (index == 0) {
        let x: IWord = {
          word: element,
          count: 1,
        };
        this.words.push(x);

      } else {
        let isExist = this.words.find(elementt => elementt.word == element) // daha önce kelime eklenmiş mi ? 
        if (isExist) {
          isExist.count++;
        }
        else {
          let x: IWord = { //objeyi olusturudk
            word: element,
            count: 1,
          };
          this.words.push(x);
        }
      }
      this.calculateFrequency();
    });
  }

  calculateFrequency() {
    this.frequency = this.words.sort((a, b) => b.count - a.count).slice(0, 5);  //(n,n+1)
  }
}
