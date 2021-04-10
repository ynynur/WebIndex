import { Component } from '@angular/core';
import { IWord } from '../interfaces/word.interface';
import { ParseService } from '../parse.service';


@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent {
  title = 'frontend';
  content: any;
  link = '';
  words: IWord[] = []; //array 
  // words: Array <Word> = []; 
  isLoading = false;


  constructor(private parseService: ParseService) {
    // servisi kullanabilmemiz için inject ediyoruz.
  }

  getWikipediaInfo() {
    this.parseService
      .getWikipediaInfo(this.link)
      .subscribe((data: any) => { //data type : any 
        this.content = this.escapeHtml(data.response);
        const wordArray = this.convertResponse(this.content);
        this.countWords(wordArray);
      });
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
    });
  }


  /*
  getSubtitle() {
    console.log(this.link);
    this.isLoading = true;

    this.parseService
      .getSubtitleFromLink(this.link)
      .pipe(
        delay(1000)
      )
      .subscribe((data: { response: string, success: boolean }) => {
        if (data.success) {
          console.log(data);
          this.content = data.response;
          let wordArray: string[] = data.response.split(" ").map(w => {
            w = w.toLowerCase();
            w = w.replace(/[&/\#,+()$~%.'":*?<>{}]/g, '');
            return w;
          });
          //map(w => w.toLowerCase());  parçaladık, atanmayan bir array ve icerisinde stringler var arrayi map ederek tek tek alıp kücük harfe çevirdik
          console.log(wordArray);
          // wordArray.forEach(this.getNur)
          //fonksiyon fonksiyon olarak parametre alıyor - functional programming (js)
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

          });

          this.frequency = this.words.sort((a, b) => b.count - a.count).slice(0, 5);  //(n,n+1)

        } else {
          this.content = data.response;
        }
        this.isLoading = false;
      });

  }
  */

}
