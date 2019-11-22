import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})


export class AdminLocalStorageService {

  setToken = token => {
    return localStorage.setItem('token', token);
  }

  getToken = () =>  {
    return localStorage.getItem('token');
  }
  deleteToken = () =>  {
    return localStorage.setItem('token', '');
  }

  constructor() { }


}
