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
  error: any = '';

  guessRandomNum(min, max) {
    this.guessedNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    localStorage.setItem('guessed_number', this.guessedNumber.toString());
    return this.guessedNumber;
  }

  pickNumber() {
    if (this.range.hasOwnProperty('max') && this.range.hasOwnProperty('min')) {
      this.guessedNumber = this.guessRandomNum(this.range.min, this.range.max);
      this.tries++
      this.texts.range = false;
      this.texts.guess = true;
    }
    this.localStorageManager(localStorage.getItem('state'));
  }

  lowerNumber() {
    this.range.max = this.guessedNumber;
    this.pickNumber();
  }

  biggerNumber() {

    this.range.min = this.guessedNumber;
    this.pickNumber();
  }

  finishGame() {
    this.texts.range = false;
    this.texts.guess = false;
    this.texts.finish = true;
    this.localStorageManager('finish_game');
  }

  playAgain() {
    this.texts.range = true;
    this.texts.guess = false;
    this.texts.finish = false;
    this.range = {};
    this._getFromServer.getDataFromServer(this.rangeUrl).then((res) => {
      this.range = res;
      localStorage.setItem('range_min', this.range.min);
      localStorage.setItem('range_max', this.range.max);
    });
    this.tries = 0;
    localStorage.setItem('tries', this.tries.toString());
    localStorage.setItem('state', 'enabled');
  }

  localStorageManager(currentState) {
    switch (currentState) {
      case 'enabled':
        localStorage.setItem('state', 'number_picked');
        localStorage.setItem('range_min', this.range.min);
        localStorage.setItem('range_max', this.range.max);
        localStorage.setItem('tries', this.tries.toString());
        break;
      case 'number_picked':
        localStorage.setItem('range_min', this.range.min);
        localStorage.setItem('range_max', this.range.max);
        localStorage.setItem('tries', this.tries.toString());
        break;
      case 'finish_game':
        localStorage.setItem('state', 'play_again');
        break;
    }
  }

  localStorageInit(state) {
    switch (state) {
      case 'play_again':
        this.texts.range = false;
        this.texts.guess = false;
        this.texts.finish = true;
        this.range = {
          "min": localStorage.getItem('range_min'),
          "max": localStorage.getItem('range_max')
        };
        this.tries = Number(localStorage.getItem('tries'));
        this.finishGame();
        break;
      case 'number_picked':
        this.texts.range = false;
        this.texts.guess = true;
        this.texts.finish = false;
        this.range = {
          "min": localStorage.getItem('range_min'),
          "max": localStorage.getItem('range_max')
        };
        this.tries = Number(localStorage.getItem('tries'));
        this.guessedNumber = Number(localStorage.getItem('guessed_number'));
        this.localStorageManager('number_picked');
        break;
      default:
        return true;
    }
    return false;
  }

  ngOnInit(): void {
    let proceed = this.localStorageInit(localStorage.getItem('state'));
    if (proceed) {
      this._getFromServer.getDataFromServer(this.rangeUrl).then((res) => {
        this.range = res;
        console.log(res);
      })
        .catch((error) => {
          this.error = error;
          console.log(error);
        });
    }
  }

}
