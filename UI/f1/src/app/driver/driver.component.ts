import { Component, OnInit } from '@angular/core';
import { Driver } from '../classes/driver';
import { DriversService } from '../drivers.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-driver',
  templateUrl: './driver.component.html',
  styleUrls: ['./driver.component.css']
})
export class DriverComponent implements OnInit {

  driver!: Driver;
  isLogedin!: boolean;

  constructor(private driverService: DriversService,
    private router: Router,
    private route: ActivatedRoute,
    private authenticationSerivce: AuthenticationService
  ) {
    this.driver = new Driver();
  }

  getDriverId(): string {
    return this.route.snapshot.params[environment.driverId]
  }

  getTeamId(): string {
    return this.route.snapshot.params[environment.teamId]
  }

  editDriver() {
    this.router.navigateByUrl(environment.navigateTeams + this.getTeamId() + environment.navigateDrivers + this.getDriverId() + environment.navigateEdit);
  }

  deleteDriver() {
    this.driverService.deleteDriverById(this.getTeamId(), this.getDriverId()).subscribe({
      next: () => {
        this.router.navigateByUrl(environment.navigateTeams + this.getTeamId());
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  back() {
    this.router.navigateByUrl(environment.navigateTeams + this.getTeamId());
  }

  ngOnInit(): void {
    this.isLogedin = this.authenticationSerivce.isLoggedIn;

    this.driverService.getDriverById(this.getTeamId(), this.getDriverId()).subscribe({
      next: (driver) => {
        this.driver = driver;
      },
      error: (err) => {        
        console.log(err);
      }
    })
  }
}
