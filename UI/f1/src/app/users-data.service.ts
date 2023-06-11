import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Users } from './classes/users';

@Injectable({
  providedIn: 'root'
})
export class UsersDataService {

  public loginUser = (user: Users) => {
    return this.http.post("http://localhost:7272/users/login", user)
  }

  constructor(private http: HttpClient) { }
}
