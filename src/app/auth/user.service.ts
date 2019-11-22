import { Injectable } from '@angular/core';
import { CognitoService } from './cognito.service';
import { AdminLocalStorageService } from '../admin-local-storage.service';
import { CognitoUserAttribute, AuthenticationDetails, CognitoUser } from 'amazon-cognito-identity-js';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(public cognito: CognitoService, public localStorage: AdminLocalStorageService) {}

  loginUser({ Username, Password }) {
    const authenticationData = {
      Username,
      Password
    };
    const authenticationDetails = new AuthenticationDetails(authenticationData);
    const poolData = this.cognito.poolData;
    const userPool = this.cognito.getUserPool();
    const userData = {
      Username,
      Pool: userPool
    };
    const cognitoUser = new CognitoUser(userData);
    cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess: result => {
        console.log(result);
        const accessToken = result.getAccessToken().getJwtToken();
        /* Use the idToken for Logins Map when Federating User Pools with identity pools or when passing through an Authorization Header to an API Gateway Authorizer*/

        // const idToken = result.idToken.jwtToken;
      },

      onFailure: err => {
        console.log(err);
      }
    });
  }

  getCurrentUser() {
    // let data = this.cognito.poolData;
    const userPool = this.cognito.getUserPool();
    const cognitoUser = userPool.getCurrentUser();
    if (cognitoUser != null) {
      cognitoUser.getSession((err, session) => {
        if (err) {
          alert(err);
          return;
        }
        console.log('session validity: ' + session.isValid());
      });
    }
  }

  logoutUser() {
    const userPool = this.cognito.getUserPool();
    const cognitoUser = userPool.getCurrentUser();
    if (cognitoUser != null) {
      cognitoUser.signOut();
    }
  }

  registerUser({ username, password, email }) {
    const userPool = this.cognito.getUserPool();

    const attributeList = [];

    const dataEmail = {
      Name: 'email',
      Value: email
    };

    const attributeEmail = new CognitoUserAttribute(dataEmail);

    attributeList.push(attributeEmail);

    userPool.signUp(username, password, attributeList, null, (err, result) => {
      if (err) {
        console.log(err.message);
        return;
      }
      const cognitoUser = result.user;
      const code = prompt('Enter code from email');
      console.log('user name is ' + cognitoUser.getUsername());
    });
  }
  confirmUser(code) {
    const userPool = this.cognito.getUserPool();
    const cognitoUser = userPool.getCurrentUser();
    cognitoUser.confirmRegistration(code, true, (err, result) => {
      if (err) {
        throw Error(err.message);
      }
      console.log('call result: ' + result);
    });
  }
}
