import { Component, OnInit } from '@angular/core';

import { TeamsDataService } from '../teams-data.service';
import { Team } from '../classes/team';
import { Driver } from '../classes/driver';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.css']
})
export class TeamsComponent implements OnInit{
  teams: Team[] = [];
  numberOfTeams!: number;
  count: number = environment.defaultTeamCount;
  offset: number = environment.defaultTeamOffset;
  hovered!: number;
  
  constructor(private teamService: TeamsDataService) {}

  spliceDrivers(drivers: Driver[]){
    if (drivers.length > environment.defaultDriverCount ) {
      return [drivers[0], drivers[1]];
    } else return drivers;
  }

  previousTeam() {
    this.offset -= environment.defaultTeamCount;
    this.getAllTeams();
  }

  nextTeam() {
    this.offset += environment.defaultTeamCount;
    this.getAllTeams();
  }

  getAllTeams() {
    this.teamService.getTeams(this.count, this.offset).subscribe({
      next: (teams) => {
        this.teams = teams;
      },
      error: (err) => {
        console.log(err);

      }
    });
  }

  getAllTeamsCount() {
    this.teamService.getNumberfTeams().subscribe({
      next: (numberOfTeams) => {
        this.numberOfTeams = numberOfTeams;
      },
      error: (err) => {
        console.log(err);

      }
    })
  }

  ngOnInit(): void {
    this.getAllTeams();
    this.getAllTeamsCount();

  }
}
