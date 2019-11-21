import { Injectable } from '@angular/core';
import { AdminLocalStorageService } from '../admin-local-storage.service';


@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  constructor(private localStorage: AdminLocalStorageService) {

   }

   isAuthenticated() {
    const token = this.localStorage.getToken();
    return token != null;
  }
}
