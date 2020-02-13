import { Injectable } from '@angular/core';
import createAuth0Client from '@auth0/auth0-spa-js';
import Auth0Client from '@auth0/auth0-spa-js/dist/typings/Auth0Client';
import { from, of, Observable, BehaviorSubject, combineLatest, throwError } from 'rxjs';
import { tap, catchError, concatMap, shareReplay } from 'rxjs/operators';
import { Router } from '@angular/router';
import { JwtHelperService } from "@auth0/angular-jwt";
import Auth0Lock from "auth0-lock";


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  lock = new Auth0Lock('see7PgmOPj7S0F5JEXP232vPkf8N3PUN', 'oj-project.auth0.com', {
    auth: {
      redirectUrl: 'https://192.168.153.128:3000',    // If not specified, defaults to the current page 
      responseType: 'token id_token',
      params: {
        scope: 'openid email'                // Learn about scopes: https://auth0.com/docs/scopes
      }
    }
  })
  // Create an observable of Auth0 instance of client
  auth0Client$ = (from(
    createAuth0Client({
      domain: "oj-project.auth0.com",
      client_id: "see7PgmOPj7S0F5JEXP232vPkf8N3PUN",
      redirect_uri: `${window.location.origin}`
    })
  ) as Observable<Auth0Client>).pipe(
    shareReplay(1), // Every subscription receives the same shared value
    catchError(err => throwError(err))
  );
  // Define observables for SDK methods that return promises by default
  // For each Auth0 SDK method, first ensure the client instance is ready
  // concatMap: Using the client instance, call SDK method; SDK returns a promise
  // from: Convert that resulting promise into an observable
  isAuthenticated$ = this.auth0Client$.pipe(
    concatMap((client: Auth0Client) => from(client.isAuthenticated())),
    tap(res => this.loggedIn = res)
  );
  handleRedirectCallback$ = this.auth0Client$.pipe(
    concatMap((client: Auth0Client) => from(client.handleRedirectCallback()))
  );
  // Create subject and public observable of user profile data
  private userProfileSubject$ = new BehaviorSubject<any>(null);
  userProfile$ = this.userProfileSubject$.asObservable();
  // Create a local property for login status
  loggedIn: boolean = null;
  
  constructor(private router: Router) {
    // On initial load, check authentication state with authorization server
    // Set up local auth streams if user is already authenticated
    this.localAuthSetup();
    // Handle redirect from Auth0 login
    this.handleAuthCallback();
    this.lock.on("authenticated", (authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.setSession(authResult);
      }
      this.lock.getUserInfo(authResult.accessToken, (error , profileResult) => {
        if (error) {
          console.log(error);
        } else {
          localStorage.setItem('profile', profileResult)
        }
      })
    });
  }
  private setSession(authResult): void {
    // Set the time that the access token will expire at
    const expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('expires_at', expiresAt);
  }
  private removeSession() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
  }
  // When calling, options can be passed if desired
  // https://auth0.github.io/auth0-spa-js/classes/auth0client.html#getuser
  getUser$(options?): Observable<any> {
    return this.auth0Client$.pipe(
      concatMap((client: Auth0Client) => from(client.getUser(options))),
      tap(user => this.userProfileSubject$.next(user))
    );
  }

  private localAuthSetup() {
    // This should only be called on app initialization
    // Set up local authentication streams
    const checkAuth$ = this.isAuthenticated$.pipe(
      concatMap((loggedIn: boolean) => {
        if (loggedIn) {
          // If authenticated, get user and set in app
          // NOTE: you could pass options here if needed
          return this.getUser$();
        }
        // If not authenticated, return stream that emits 'false'
        return of(loggedIn);
      })
    );
    checkAuth$.subscribe();
  }
  // public authenticated(){
  //   return this.jwtHelper.isTokenExpired();
  // }
  
  // login(redirectPath: string = '/') {
  //   // A desired redirect path can be passed to login method
  //   // (e.g., from a route guard)
  //   // Ensure Auth0 client instance exists
  //   this.auth0Client$.subscribe((client: Auth0Client) => {
  //     // Call method to log in
  //     client.loginWithRedirect({
  //       redirect_uri: `${window.location.origin}`,
  //       appState: { target: redirectPath }
  //     });
  //   });
  // }
  public login() {
    this.lock.show();
  }
  
  
  // public login() : Promise<Object>  {
  //   return new Promise((resolve, reject) => {
  //     this.lock.show((error: string, profile: Object, id_token: string) => {
  //       if(error){
  //         //reject(error);
  //         console.log(error);
  //       }else{
  //         localStorage.setItem('profile', JSON.stringify(profile) );
  //         localStorage.setItem('id_token', id_token);
  //       }
  //     });
  //   })
  // }  
  private handleAuthCallback() {
    // Call when app reloads after user logs in with Auth0
    const params = window.location.search;
    if (params.includes('code=') && params.includes('state=')) {
      let targetRoute: string; // Path to redirect to after login processsed
      const authComplete$ = this.handleRedirectCallback$.pipe(
        // Have client, now call method to handle auth callback redirect
        tap(cbRes => {
          // Get and set target redirect route from callback results
          targetRoute = cbRes.appState && cbRes.appState.target ? cbRes.appState.target : '/';
        }),
        concatMap(() => {
          // Redirect callback complete; get user and login status
          return combineLatest([
            this.getUser$(),
            this.isAuthenticated$
          ]);
        })
      );
      // Subscribe to authentication completion observable
      // Response will be an array of user and login status
      authComplete$.subscribe(([user, loggedIn]) => {
        // Redirect to target route after callback processing
        this.router.navigate([targetRoute]);
      });
    }
  }

  logout() {
    this.removeSession();
  }
  // logout() {
  //   // Ensure Auth0 client instance exists
  //   this.auth0Client$.subscribe((client: Auth0Client) => {
  //     // Call method to log out
  //     client.logout({
  //       client_id: "see7PgmOPj7S0F5JEXP232vPkf8N3PUN",
  //       returnTo: `${window.location.origin}`
  //     });
  //   });
  // }

}