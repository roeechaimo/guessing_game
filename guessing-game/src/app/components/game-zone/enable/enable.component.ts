import { Component } from '@angular/core';
import { GetFromServer } from '../../../services/getFromServer.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-enable',
  templateUrl: 'enable.component.html',
  styleUrls: ['enable.component.scss']
})
export class EnableComponent {

  constructor(private _getFromServer: GetFromServer, private _router: Router) { }

  confirmationUrl: string = 'https://guessing-game-backend-v90sychixp46.runkit.sh/status';
  confirmed: boolean = false;
  error: any = '';

  enable() {
    this._getFromServer.getDataFromServer(this.confirmationUrl).then((res) => {
      this.confirmed = res.enabled;
      console.log(res);
      if (this.confirmed) {
        localStorage.setItem('state', 'enabled');
        this._router.navigateByUrl('/gameStart');
      } else {
        this.error = this.confirmed;
        console.log(this.error);
      }

    })
      .catch((error) => {
        this.error = error;
        console.log(error);
      });
  }

}
