import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Team } from '../classes/team';
import { Driver } from '../classes/driver';
import { DriversService } from '../drivers.service';
import { TeamsDataService } from '../teams-data.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css']
})
export class TeamComponent implements OnInit {
  team!: Team;
  drivers!: Driver[];

  constructor(private route: ActivatedRoute, private teamService: TeamsDataService, private router: Router, private driverService: DriversService) {
    this.team = new Team();
  }

  getTeamID() {
    return this.route.snapshot.params[environment.teamId];
  }

  addDriver() {
    this.router.navigateByUrl(environment.navigateAddDriver, { state: { _id: this.getTeamID() } });
  }

  onClickDelete() {
    this.teamService.deleteTeamsByID(this.getTeamID()).subscribe({
      next: () => {
        this.router.navigateByUrl(environment.navigateTeams);
      },
      error: (err) => {
        console.log(err);

      }

    })
  }

  count: number = environment.defaultDriverCount;
  offset: number = environment.defaultDriverOffset;
  numberOfDrivers!: number;

  getAllDrivers() {
    this.driverService.getAllDriverByTeamId(this.getTeamID(), this.count, this.offset).subscribe(
      {
        next: (drivers) => {
          this.drivers = drivers;
        },
        error: (err) => {
          console.log(err);
        }
      
    }
    )
  }

  nextDriver() {
    this.offset += environment.defaultDriverCount;    
    this.getAllDrivers();
  }

  previousDriver() {
    this.offset -= environment.defaultDriverCount;
    this.getAllDrivers();
  }

  getTeam() {
    this.teamService.getTeamsByID(this.getTeamID()).subscribe(
      {
        next: (team) => {
          this.team = team;
          this.numberOfDrivers = team.drivers?.length;          
        },
        error: (err) => {
          console.log(err);
        }
      }
    );
  }

  ngOnInit(): void {
    this.getTeam();
    this.getAllDrivers();
  }

}
