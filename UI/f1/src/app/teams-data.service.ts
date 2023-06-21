import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from './../environments/environment';
import { Team } from './classes/team';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class TeamsDataService {

  public getTeams(count: number, offset: number): Observable<Team[]> {
    return this.http.get<Team[]>(environment.apiUrl + environment.apiUrlTeam + environment.apiUrlCount + count + environment.apiUrlOffset + offset);
  }

  public getTeamsByID(teamId: string): Observable<Team> {
    return this.http.get<Team>(environment.apiUrl + environment.apiUrlTeam + teamId);
  }

  public updateTeamsByID(teamId: string, team: Team): Observable<Team> {
    return this.http.patch<Team>(environment.apiUrl + environment.apiUrlTeam + teamId, team, { headers: this.authenticationService.getHeader });
  }

  public deleteTeamsByID(teamId: string): Observable<Team> {
    return this.http.delete<Team>(environment.apiUrl + environment.apiUrlTeam + teamId, { headers: this.authenticationService.getHeader });
  }

  public addTeam(team: Team): Observable<Team> {
    return this.http.post<Team>(environment.apiUrl + environment.apiUrlTeam, team, { headers: this.authenticationService.getHeader })
  }

  public getNumberfTeams(): Observable<number> {
    return this.http.get<number>(environment.apiUrl + environment.apiUrlTeam + environment.apiUrlTeamCount);
  }

  constructor(private http: HttpClient, private authenticationService: AuthenticationService) { }
}
