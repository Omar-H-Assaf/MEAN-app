import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Driver } from './classes/driver';
import { Observable } from 'rxjs';

import { environment } from './../environments/environment';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class DriversService {

  public getAllDriverByTeamId(teamId: string, count: number, offset: number): Observable<Driver[]> {
    return this.http.get<Driver[]>(environment.apiUrl + environment.apiUrlTeam + teamId + environment.apiUrlDriver + environment.apiUrlCount + count + environment.apiUrlOffset + offset);
  }

  public getDriverById(teamId: string, driverId: string): Observable<Driver> {
    return this.http.get<Driver>(environment.apiUrl + environment.apiUrlTeam + teamId + environment.apiUrlDriver + driverId);
  }

  public updateDriverById(teamId: string, driverId: string, driver: Driver): Observable<Driver> {
    return this.http.patch<Driver>(environment.apiUrl + environment.apiUrlTeam + teamId + environment.apiUrlDriver + driverId, driver, { headers: this.authenticationService.getHeader });
  }

  public deleteDriverById(teamId: string, driverId: string): Observable<Driver> {
    return this.http.delete<Driver>(environment.apiUrl + environment.apiUrlTeam + teamId + environment.apiUrlDriver + driverId, { headers: this.authenticationService.getHeader });
  }

  public addDriver(teamId: string, driver: Driver): Observable<Driver> {
    return this.http.post<Driver>(environment.apiUrl + environment.apiUrlTeam + teamId + environment.apiUrlDriver, driver, { headers: this.authenticationService.getHeader });
  }

  constructor(private http: HttpClient, private authenticationService: AuthenticationService) { }
}
