import { Injectable } from '@angular/core';
import {tokenNotExpired} from 'angular2-jwt';
import { Router } from '@angular/router';
import 'rxjs/add/operator/filter';
import * as auth0 from 'auth0-js';
import {Http, Response, Headers} from '@angular/http';
import 'rxjs/add/operator/toPromise';

declare var Auth0Lock: any;
@Injectable()
export class AuthService {

    auth0 = new auth0.WebAuth({
    clientID: 'bxSx0i0sz1QrrhbzS4scDSRHQKi5VlOc',
    domain: 'rockxulin.auth0.com',
    responseType: 'token id_token',
    audience: 'https://rockxulin.auth0.com/userinfo',
    redirectUri: 'http://localhost:3000/callback',
    scope: 'openid'
  });
  constructor(public router: Router, private http: Http) {

  }

  public login(): void {
    this.auth0.authorize();
  }

  public authenticated(){
    return tokenNotExpired();
  }

  public handleAuthentication(): void {
   this.auth0.parseHash((err, authResult) => {
     if (authResult && authResult.accessToken && authResult.idToken) {
       window.location.hash = '';
       this.setSession(authResult);
       this.router.navigate(['/home']);
     } else if (err) {
       this.router.navigate(['/home']);
       console.log(err);
     }
   });
 }

 private setSession(authResult): void {
   // Set the time that the access token will expire at
   const expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
   localStorage.setItem('access_token', authResult.accessToken);
   localStorage.setItem('id_token', authResult.idToken);
   localStorage.setItem('expires_at', expiresAt);
 }

 public logout(): void {
   // Remove tokens and expiry time from localStorage
   localStorage.removeItem('access_token');
   localStorage.removeItem('id_token');
   localStorage.removeItem('expires_at');
   // Go back to the home route
   this.router.navigate(['/']);
 }

 public isAuthenticated(): boolean {
   // Check whether the current time is past the
   // access token's expiry time
   const expiresAt = JSON.parse(localStorage.getItem('expires_at'));
   return new Date().getTime() < expiresAt;
 }

  public getProfile(): Object {
    return JSON.parse(localStorage.getItem('profile'));
  }
  public resetPassword(): void{
    let profile = this.getProfile();
    let url: string = `https://rockxulin.auth0.com/dbconnections/change_password`;
    let headers = new Headers({ 'content-type': 'application/json'});
    let body = { client_id: 'bxSx0i0sz1QrrhbzS4scDSRHQKi5VlOc',
                  email: 'profile.email',
                  connection: 'Username-Password-Authentication'
               }
    this.http.post(url, body, headers)
      .toPromise()
      .then((res: Response) => {
        console.log(res.json());
      })
      .catch(this.handleError);
  }
  private handleError(error: any): Promise<any>{
    console.error('Error occurred', error);
    return Promise.reject(error.message || error);
  }

}
