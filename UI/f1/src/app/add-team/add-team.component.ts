import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { Team } from '../classes/team';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-add-team',
  templateUrl: './add-team.component.html',
  styleUrls: ['./add-team.component.css']
})
export class AddTeamComponent implements OnInit {
  myForm!: FormGroup;
  team: Team = new Team()
  constructor(private router: Router,
  ) { }

  ngOnInit(): void {
    this.team = window.history.state;
    this.myForm = new FormGroup({
      fullTeamName: new FormControl(this.team.fullTeamName),
      teamName: new FormControl(this.team.teamName),
      teamCheif: new FormControl(this.team.teamCheif),
      teamcolor: new FormControl(this.team.teamcolor),
      powerUnit: new FormControl(this.team.powerUnit),
      firstTeamEntry: new FormControl(this.team.firstTeamEntry),
      worldChampions: new FormControl(this.team.worldChampions),
      polePosiotion: new FormControl(this.team.polePosiotion),
      fastestLaps: new FormControl(this.team.fastestLaps),
      carImage: new FormControl(this.team.carImage)
    })
  }

  onNext(form: FormGroup) {
    this.router.navigateByUrl(environment.navigateAddDriver, { state: form.value });
  }
}
