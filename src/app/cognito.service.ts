import { Injectable } from '@angular/core';
import {CognitoUserPool} from 'amazon-cognito-identity-js';


@Injectable({
  providedIn: 'root'
})
export class CognitoService {
  private PC = {
      UserPoolId: 'us-east-1_ibYDmzY8b',
      ClientId: '1alp6a20v4emq85m529sennfsg'
  };
  userPool = new CognitoUserPool(this.PC);

  constructor() { }
}
