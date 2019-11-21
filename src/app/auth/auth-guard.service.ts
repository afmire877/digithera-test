import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthServiceService } from './auth-service.service';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class AuthGuardService implements CanActivate {
  constructor(
    private auth: AuthServiceService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  canActivate(): Promise<boolean> {
    return new Promise(resolve => {
      if (this.auth.isAuthenticated()) {
        resolve(true);
      } else {
        this.toastr.error('Please login...', 'Unauthorized');
        this.router.navigate(['/']);
        resolve(false);
      }
    });
  }
}
