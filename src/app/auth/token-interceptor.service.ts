import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import 'rxjs/add/operator/do';

import { AdminLocalStorageService } from '../admin-local-storage.service';
import { AuthServiceService } from './auth-service.service';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {
  constructor(
    public auth: AuthServiceService,
    private localStorage: AdminLocalStorageService,
    private router: Router,
    private toastr: ToastrService
  ) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const authData = this.localStorage.getToken();
    let requestItem = req;
    if (authData) {
      requestItem = req.clone({
        headers: req.headers.set('Authorization', authData.jwtToken)
      });
    }

    return next.handle(requestItem).do((event: HttpEvent<any>) => {
      if (event instanceof HttpResponse) {
        //letting it pass
      }
    }, (err: any) => {
        if (err instanceof HttpErrorResponse) {
            if (err.status === 401) {
                this.localStorage.deleteToken();
                this.toastr.error('Please login again.', 'Session ended');
                this.router.navigate(['/']);
            }
        }
    });
  }
}
