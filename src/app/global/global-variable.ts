import { Injectable } from '@angular/core'

@Injectable()
export class GlobalVariableService {

  public apiURL = '';

  constructor () {
    let url = window.location.href;

    if (url.indexOf("4200") !== -1) {
      this.apiURL = 'http://localhost:8080/';
    } else if (url.indexOf("superlivetimingviewhomol") !== -1) {
      this.apiURL = 'https://superlivetimingwebservicehomol.herokuapp.com/';
    } else if (url.indexOf("superlivetiming") !== -1) {
      this.apiURL = 'https://superlivetimingwebservice.herokuapp.com/';
    }
  }
}