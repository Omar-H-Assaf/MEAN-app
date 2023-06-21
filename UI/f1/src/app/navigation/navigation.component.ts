import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  isLogedin!: boolean;

  constructor(private _router: Router, private _authenticationService: AuthenticationService) { }

  ngOnInit(): void {
    this.isLogedin = this._authenticationService.isLoggedIn
  }

  logout() {
    this.isLogedin = false;
    this._authenticationService.token = '';
  }

  onHome(): void {
    this._router.navigate(['']);
  }
}
