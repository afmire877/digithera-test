import { Injectable } from '@angular/core';
import { AdminLocalStorageService } from '../admin-local-storage.service';
import { UserService } from '../auth/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  constructor(private localStorage: AdminLocalStorageService, public user: UserService) {}

  isAuthenticated(): boolean {
    const token = this.user.getCurrentToken();
    return token != null;
  }
}
