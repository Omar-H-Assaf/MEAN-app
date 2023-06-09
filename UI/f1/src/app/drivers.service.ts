import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Driver } from './classes/driver';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DriversService {

  public getDriverById(teamId: string, driverId: string): Observable<Driver> {
    return this.http.get<Driver>("http://localhost:7272" + '/teams/' + teamId + "/drivers/" + driverId);
  }

  constructor(private http: HttpClient) { }
}
