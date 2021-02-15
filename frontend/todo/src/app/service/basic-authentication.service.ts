import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Injectable } from '@angular/core'
import {map} from 'rxjs/operators'
import { API_URL } from '../app.constants'

export const TOKEN = 'mytoken'
export const AUTHENTICATED_USER = 'authenticatedUser'

@Injectable({
  providedIn: 'root'
})
export class BasicAuthenticationService {

  constructor(private http: HttpClient) { }

  // this method is not needed any more
  // authenticate(username, password) {
  //   console.log('before ' + this.isUserLoggedIn())
  //   if (username === 'user' && password === 'pass') {
  //     window.sessionStorage.setItem('authenticatedUser', username)
  //     console.log('after ' + this.isUserLoggedIn())
  //     return true
  //   } else {
  //     return false
  //   }
  // }

  executeJWTAuthenticationService(username: string, password: string): any {

    // there is a javascript function called window.btoa to encode a string
    // created encoded string with user and password:
    let basicAuthHeaderString = "Bearer " + window.btoa(username + ":" + password) // the space after "BASIC " is important





    return (this.http.post<any>(
      `${API_URL}/authenticate`,{
        username, //  this is a shortcut, it will look actually like this:
        password  //{  "username" :"xxxxx",  "password": "yyyyy" } **** xxx,yyy are the values of username and password
      }))
      .pipe( // 28min says: pipe what should be done if the request successes. We will use this in login.component.ts
        map(
          data => {
            console.log("Running inside basic-authentication.service.ts -> pipe -> map with following data")
            console.log(data)
            window.sessionStorage.setItem(AUTHENTICATED_USER, username)
            sessionStorage.setItem(TOKEN, `Bearer ${data.token}`) // 28min uses "token" here
            return data
          }
        )
      )

  }


  getAuthenticatedUser(): string {
    return sessionStorage.getItem(AUTHENTICATED_USER)
  }

  getAuthenticatedToken(): string {
    if (this.getAuthenticatedUser())
      return sessionStorage.getItem(TOKEN)
  }

  isUserLoggedIn() {
    let user = sessionStorage.getItem(AUTHENTICATED_USER)
    return !(user === null)
  }

  logout() {
    sessionStorage.removeItem(AUTHENTICATED_USER)
    sessionStorage.removeItem(TOKEN)
  }
}

export class AuthenticationBean {
  constructor(public message: string) { }
}
