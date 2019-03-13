import {Injectable} from '@angular/core';
import {CognitoAuth, CognitoAuthOptions} from 'amazon-cognito-auth-js';
import {CognitoUser, CognitoUserSession} from 'amazon-cognito-identity-js';
import {environment} from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private DOMAIN = environment.authDomain;
  private CLIENT_ID = environment.authClientId;
  private USER_POOL = environment.userPoolId;
  private REDIRECT_URI = environment.authRedirectUri;
  private auth: CognitoAuth;
  private expiresAt: Date;
  private userName: string;
  private email: string;
  private admin: boolean;

  constructor() {
    this.initAuth();
    this.retrieveUserData();
  }

  public getLoginUrl() {
    return `${this.DOMAIN}/login?response_type=token&client_id=${this.CLIENT_ID}&redirect_uri=${this.REDIRECT_URI}`;
  }

  public parseUrl(url: string) {
    this.auth.parseCognitoWebResponse(url);
  }

  public isLoggedIn() {
    return this.expiresAt > new Date();
  }

  public logout() {
    this.expiresAt = new Date(0);
    this.userName = undefined;
    this.email = undefined;
    this.admin = false;
    localStorage.removeItem('EXPIRATION');
    localStorage.removeItem('ID_PAYLOAD');
  }

  public getUserName() {
    return this.userName;
  }

  public isAdmin() {
    return this.admin;
  }

  private retrieveUserData() {
    const expiration = localStorage.getItem('EXPIRATION') || '0';
    this.expiresAt = new Date(Number.parseInt(expiration, 10) * 1000);
    const payload = JSON.parse(localStorage.getItem('ID_PAYLOAD') || '{}');
    this.admin = (payload['cognito:groups'] || []).includes('admin');
    this.email = payload.email;
    this.userName = payload['cognito:username'];
  }

  private storeUserData(data: CognitoUserSession) {
    const idToken = data.getIdToken();
    localStorage.setItem('EXPIRATION', idToken.getExpiration().toString());
    localStorage.setItem('ID_PAYLOAD', JSON.stringify(idToken.decodePayload()));
  }

  private initAuth() {
    // Todo: Use environment
    const authData: CognitoAuthOptions = {
      ClientId: this.CLIENT_ID,
      AppWebDomain: this.DOMAIN,
      TokenScopesArray: ['email', 'profile', 'openid'],
      RedirectUriSignIn: this.REDIRECT_URI,
      RedirectUriSignOut: this.REDIRECT_URI,
      UserPoolId: this.USER_POOL
    };
    this.auth = new CognitoAuth(authData);
    this.auth.userhandler = {
      onSuccess: (result: CognitoUserSession) => {
        console.log(result);
        this.storeUserData(result);
        this.retrieveUserData();
      },
      onFailure: (err) => {
        console.log(err);
      }
    };
  }
}
