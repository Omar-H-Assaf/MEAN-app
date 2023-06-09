import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  // #isLoggedIn: boolean= false;
  // get isLoggedIn() {return this.#isLoggedIn};
  // set isLoggedIn(isLoggedIn: boolean) {this.#isLoggedIn = isLoggedIn}
  get isLoggedIn(): boolean {
    if (localStorage.getItem("loggedIn")) {
      return true;
    } else {
      return false;
    }
  };
  set isLoggedIn(isLoggedIn: boolean) {
    if (isLoggedIn) {
      localStorage.setItem("loggedIn", "true"); 
    } else {
      localStorage.removeItem("loggedIn");
    }
  }
  constructor() { }
}
