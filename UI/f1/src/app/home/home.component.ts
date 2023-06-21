import { Component, OnInit } from '@angular/core';

import { Team } from '../classes/team';
import { TeamsDataService } from '../teams-data.service';
import { AuthenticationService } from '../authentication.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  teams: Team[] = [];
  userInfo!: {};
  decodeToken!: { firstName: '', lastName: '' };
  headerText!: string;
  constructor(private teamService: TeamsDataService, private authenticationService: AuthenticationService) { }

  ngOnInit(): void {
    console.log(this.authenticationService.isLoggedIn);
    
    this.decodeToken = this.authenticationService.getDecodedAccessToken();

    if (this.decodeToken) {
      this.headerText =environment.homeHeadeText + this.decodeToken.firstName+ " " + this.decodeToken.lastName;
    } else {
      this.headerText = environment.homeHeadeText;
    }

    this.teamService.getTeams(environment.defaultTeamHomeCount, 0).subscribe({
      next: (teams) => {
        this.teams = teams.sort((a, b) => (a.worldChampions < b.worldChampions) ? 1 : -1);
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

}
