import { Injectable } from '@angular/core';

import {
  IAuthenticationDetailsData,
  CognitoUserPool,
  CognitoUserAttribute,
  ICognitoUserAttributeData
} from 'amazon-cognito-identity-js';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CognitoService {
  public static UserPoolId = environment.UserPoolId;
  public static ClientId = environment.ClientId;

  public poolData: any = {
    UserPoolId: 'us-east-1_qRdMI4QGp',
    ClientId: '193l2qgeu9o51qpmboddhda5kk'
  };

  constructor() {}

  public getUserPool() {
    return new CognitoUserPool(this.poolData);
  }

  getCurrentUser() {
    return this.getUserPool().getCurrentUser();
  }

  getAccessToken(cb: any) {
    if (this.getCurrentUser() !== null) {
      this.getCurrentUser().getSession((err, session) => {
        if (err) {
          console.log(err);
        } else {
          if (session.isValid()) {
            cb(session.getAccessToken().getJwtToken());
          }
        }
      });
    }
  }
}
