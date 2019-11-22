import { Component } from '@angular/core';
import { AdminLocalStorageService } from '../app/admin-local-storage.service';
import { UserService } from './auth/user.service';
import { CognitoService } from './auth/cognito.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  currentUser = null;
  logout() {
    this.user.logoutUser();
    this.currentUser = null;
  }
  constructor(private service: AdminLocalStorageService, private user: UserService, public cognito: CognitoService) {}
  // tslint:disable-next-line: use-lifecycle-interface
  ngOnInit() {
    this.currentUser = this.cognito.getCurrentUser();
  }
}
