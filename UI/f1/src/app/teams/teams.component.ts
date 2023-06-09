import { Component, OnInit } from '@angular/core';

import { TeamsDataService } from '../teams-data.service';
import { Team } from '../classes/team';
import { Driver } from '../classes/driver';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.css']
})
export class TeamsComponent implements OnInit{
  teams: Team[] = [];

  constructor(private teamService: TeamsDataService) {}

  ngOnInit(): void {
    this.teamService.getTeams().subscribe(teams => {
      this.teams = teams;
      console.log(teams);
      
    })
  }
}
