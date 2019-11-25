import { Injectable } from '@angular/core';
import { CognitoService } from './cognito.service';
import { AdminLocalStorageService } from '../admin-local-storage.service';
import { CognitoUserAttribute, AuthenticationDetails, CognitoUser } from 'amazon-cognito-identity-js';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(public cognito: CognitoService, public localStorage: AdminLocalStorageService) {}
  registeringUser;
  // public CurrentRegistering = this.registeringUser.asObservable();
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

        // const idToken = result.idToken.jwtToken;
      },

      onFailure: err => {
        console.log(err);
      }
    });
  }
  getCurrentToken() {
    return this.cognito.getCurrentUser().getSession((err, session) => {
      if (err) {
        console.log(err);
        return null;
      }
      return session.getIdToken().getJwtToken();
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

  registerUser({ Username, Password, Email }, callback) {
    const userPool = this.cognito.getUserPool();
    let cognitoUser = null;
    let err;
    const attributeList = [];

    const dataEmail = {
      Name: 'email',
      Value: Email
    };

    const attributeEmail = new CognitoUserAttribute(dataEmail);

    attributeList.push(attributeEmail);

    userPool.signUp(Username, Password, attributeList, null, (error, result) => {
      callback(error, result);
    });
  }
  confirmUser(code, username) {
    const userData = {
      Username: username,
      Pool: this.cognito.getUserPool()
    };
    const cognitoUser = new CognitoUser(userData);
    cognitoUser.confirmRegistration(code, true, (err, result) => {
      if (err) {
        throw Error(err.message);
      }
      console.log('call result: ' + result);
    });
  }
}
