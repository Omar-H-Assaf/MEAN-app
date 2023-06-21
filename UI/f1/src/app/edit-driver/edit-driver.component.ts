import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl } from '@angular/forms';

import { Driver } from '../classes/driver';
import { DriversService } from '../drivers.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-edit-driver',
  templateUrl: './edit-driver.component.html',
  styleUrls: ['./edit-driver.component.css']
})
export class EditDriverComponent implements OnInit {
  driver!: Driver;
  driverName = new FormControl();
  driverNumber = new FormControl();
  country = new FormControl();
  podiums = new FormControl();
  grandsPrixEntered = new FormControl();
  worldChampionships = new FormControl();

  constructor(private driverService: DriversService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.driver = new Driver();
  }

  onEdit() {
    if (this.driverName.value) {
      this.driver.driverName = this.driverName.value
    }
    if (this.driverNumber.value) {
      this.driver.driverNumber = this.driverNumber.value
    }
    if (this.country.value) {
      this.driver.country = this.country.value
    }
    if (this.podiums.value) {
      this.driver.podiums = this.podiums.value
    }
    if (this.grandsPrixEntered.value) {
      this.driver.grandsPrixEntered = this.grandsPrixEntered.value
    }
    if (this.worldChampionships.value) {
      this.driver.worldChampionships = this.worldChampionships.value
    }

    this.driverService.updateDriverById(this.route.snapshot.params[environment.teamId], this.route.snapshot.params[environment.driverId], this.driver).subscribe({
      next: (team) => {
        this.router.navigateByUrl(environment.navigateTeams + team._id + environment.navigateDrivers + this.route.snapshot.params[environment.driverId]);
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  backButton() {
    this.router.navigateByUrl(environment.navigateTeams + this.route.snapshot.params[environment.teamId] + environment.navigateDrivers + this.route.snapshot.params[environment.driverId]);
  }

  ngOnInit(): void {
    this.driverService.getDriverById(this.route.snapshot.params[environment.teamId], this.route.snapshot.params[environment.driverId]).subscribe({
      next: (driver) => {
        this.driver = driver;
      },
      error: (err) => {
        console.log(err);
      }
    })
  }
}
