import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HartcodedAuthenticationService } from '../service/hartcoded-authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username: string = "myusername"
  password: string = ''
  errorMessage: string = 'Invalid credentials'
  invalidLogin = false

  constructor(private router: Router, public hartcodedAuthenticationService: HartcodedAuthenticationService) { }

  ngOnInit(): void {
  }

  handleLogin(): void {
    console.log(this.username + "," + this.password);
    // if (this.username === 'user' && this.password === 'pass') {
    if (this.hartcodedAuthenticationService.authenticate(this.username, this.password)) {
      //redirect
      this.router.navigate(['welcome', this.username])
      this.invalidLogin = false
    } else
      this.invalidLogin = true
  }
}
