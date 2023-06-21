import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Users } from './classes/users';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersDataService {

  public loginUser = (user: Users): Observable<string> => {
    return this.http.post<string>("http://localhost:7272/users/login", user)
  }

  public register = (user: Users) => {
    return this.http.post<string>("http://localhost:7272/users", user)
  }

  constructor(private http: HttpClient) { }
}
