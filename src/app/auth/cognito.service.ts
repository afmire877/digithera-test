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
    UserPoolId: 'us-east-2_FJiWyoOid',
    ClientId: '1jmf69kh39bhm0326hnn0ni6b'
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
