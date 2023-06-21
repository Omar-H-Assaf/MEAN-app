import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  headers!: any;

  get isLoggedIn(): boolean {
    if (localStorage.getItem("token")) {
      return true;
    } else {
      return false;
    }
  };

  set token(token: string) {
    if (token) {
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("token");
    }
  }

  get token(): string {
    return localStorage.getItem("token") || '';
  }

  get getHeader(): any {
    this.headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });
    return this.headers;
  }

  getDecodedAccessToken(): any {    
    try {
      return jwt_decode(this.token);
    } catch (Error) {
      return null;
    }
  }

  constructor() { }
}
