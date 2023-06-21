import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';

import { Team } from '../classes/team';
import { Driver } from '../classes/driver';
import { DriversService } from '../drivers.service';
import { TeamsDataService } from '../teams-data.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-add-driver',
  templateUrl: './add-driver.component.html',
  styleUrls: ['./add-driver.component.css']
})
export class AddDriverComponent implements OnInit {
  team!: Team;
  drivers: Driver[] = [];
  myForm!: FormGroup;
  addButtonText!: string;
  isAddTeam: boolean = true;

  constructor(private router: Router, private driverService: DriversService, private teamService: TeamsDataService) { }

  ngOnInit(): void {
    this.team = window.history.state;
    this.isAddTeam = this.team._id ? false : true;
    this.addButtonText = this.team._id ? environment.addDriverButtomText : environment.addTeamButtomText;

    this.myForm = new FormGroup({
      driverName: new FormControl(),
      driverNumber: new FormControl(),
      country: new FormControl(),
      podiums: new FormControl(),
      points: new FormControl(),
      grandsPrixEntered: new FormControl(),
      worldChampionships: new FormControl(),
      driverMainImage: new FormControl(),
      driverImage: new FormControl(),
    })
  }

  onAdd(form: FormGroup) {
    if (this.isAddTeam) {      
      this.drivers.push(form.value);
      this.team.drivers = this.drivers;

      this.teamService.addTeam(this.team).subscribe({
        next: () => {
          this.router.navigateByUrl(environment.navigateTeams);
        },
        error: (err) => {
          console.log(err);

        }
      });
    } else {
      this.driverService.addDriver(this.team._id, form.value).subscribe({
        next: () => {
          this.router.navigateByUrl(environment.navigateTeams + this.team._id);
        },
        error: (err) => {
          console.log(err);
        }
      })
    }
  }

  addNewDriver(form: FormGroup) {
    this.drivers.push(form.value);
    this.myForm.setValue(
      {
        driverName: '',
        driverNumber: '',
        country: '',
        podiums: '',
        points: '',
        grandsPrixEntered: '',
        worldChampionships: '',
        driverMainImage: '',
        driverImage: ''
      }
    )
  }

  onBack() {
    if (this.isAddTeam) {
      this.router.navigateByUrl(environment.navigateAddTeam, { state: this.team })
    } else {
      this.router.navigateByUrl(environment.navigateAddDriver + this.team._id)
    }
  }
}
