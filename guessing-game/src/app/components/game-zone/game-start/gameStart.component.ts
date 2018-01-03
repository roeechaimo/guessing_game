import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { GetFromServer } from '../../../services/getFromServer.service';

@Component({
  selector: 'app-game-start',
  templateUrl: 'gameStart.component.html',
  styleUrls: ['gameStart.component.scss']
})
export class GameStartComponent implements OnInit {

  constructor(private _getFromServer: GetFromServer) { }

  rangeUrl: string = 'https://guessing-game-backend-v90sychixp46.runkit.sh/range';
  range: any = {};
  guessedNumber: number = -1;
  tries: number = 0;
  texts: any = {
    'range': true,
    'guess': false,
    'finish': false,
  };  

  guessRandomNum(min, max) {
    return this.guessedNumber = Math.floor(Math.random() * (max - min + 1)) + min;
  }

  pickNumber() {
    if (this.range.hasOwnProperty('max') && this.range.hasOwnProperty('min')) {
      this.guessedNumber = this.guessRandomNum(this.range.min, this.range.max);
      this.tries++
      this.texts.range = false;
      this.texts.guess = true;
    }
  }

  lowerNumber() {
    this.range.max = this.guessedNumber;
    this.pickNumber();
  }

  biggerNumber(){
    this.range.min = this.guessedNumber;
    this.pickNumber();
  }

  finishGame(){
    this.texts.range = false;
    this.texts.guess = false;
    this.texts.finish = true;
  }

  playAgain(){
    this.texts.range = true;
    this.texts.guess = false;
    this.texts.finish = false;
    this._getFromServer.getDataFromServer(this.rangeUrl).then((res) => {
      this.range = res;
    });
    this.tries = 0;
  }

  ngOnInit(): void {
    this._getFromServer.getDataFromServer(this.rangeUrl).then((res) => {
      this.range = res;
    });
  }

}
