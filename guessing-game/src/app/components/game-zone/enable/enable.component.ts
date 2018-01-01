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

  enable() {
    this._getFromServer.getDataFromServer(this.confirmationUrl).then((res) => {
      this.confirmed = res.enabled;
      if (this.confirmed) {
        this._router.navigateByUrl('/gameStart');
      }
    });
  }

}
