import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl } from '@angular/forms';

import { Team } from '../classes/team';
import { TeamsDataService } from '../teams-data.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-edit-team',
  templateUrl: './edit-team.component.html',
  styleUrls: ['./edit-team.component.css']
})
export class EditTeamComponent implements OnInit {
  teamName = new FormControl();
  fullTeamName = new FormControl();
  teamCheif = new FormControl();
  teamcolor = new FormControl();
  powerUnit = new FormControl();
  firstTeamEntry = new FormControl();
  worldChampions = new FormControl();
  polePosiotion = new FormControl();
  fastestLaps = new FormControl();

  team: Team = new Team()

  constructor(private route: ActivatedRoute, private teamService: TeamsDataService, private router: Router) {
  }

  onEdit() {
    if (this.teamName.value) {
      this.team.teamName = this.teamName.value
    }
    if (this.fullTeamName.value) {
      this.team.fullTeamName = this.fullTeamName.value
    }
    if (this.teamCheif.value) {
      this.team.teamCheif = this.teamCheif.value
    }
    if (this.teamcolor.value) {
      this.team.teamcolor = this.teamcolor.value
    }
    if (this.powerUnit.value) {
      this.team.powerUnit = this.powerUnit.value
    }
    if (this.firstTeamEntry.value) {
      this.team.firstTeamEntry = this.firstTeamEntry.value
    }
    if (this.worldChampions.value) {
      this.team.worldChampions = this.worldChampions.value
    }
    if (this.polePosiotion.value) {
      this.team.polePosiotion = this.polePosiotion.value
    }
    if (this.fastestLaps.value) {
      this.team.fastestLaps = this.fastestLaps.value
    }

    this.teamService.updateTeamsByID(this.route.snapshot.params[environment.teamId], this.team).subscribe({
      next: (team) => {
        this.router.navigateByUrl(environment.navigateTeams + team._id);
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  getTeam() {
    this.teamService.getTeamsByID(this.route.snapshot.params[environment.teamId]).subscribe(
      {
        next: (team) => {
          this.team = team;
        },
        error: (err) => {
          console.log(err);
        }
      }
    );
  }

  ngOnInit(): void {
    this.getTeam();

  }

}
