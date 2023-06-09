import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Team } from './classes/team';

@Injectable({
  providedIn: 'root'
})
export class TeamsDataService {

  public getTeams(): Observable<Team[]> {
    return this.http.get<Team[]>("http://localhost:7272" + '/teams');
  }

  public getTeamsByID(teamId: string): Observable<Team> {
    return this.http.get<Team>("http://localhost:7272" + '/teams/' + teamId);
  }

  public updateTeamsByID(teamId: string, team: Team): Observable<Team> {
    return this.http.put<any>("http://localhost:7272" + '/teams/' + teamId, team);
  }

  public deleteTeamsByID(teamId: string): Observable<Team> {
    return this.http.delete<any>("http://localhost:7272" + '/teams/' + teamId);
  }

  constructor(private http:HttpClient) { }
}
