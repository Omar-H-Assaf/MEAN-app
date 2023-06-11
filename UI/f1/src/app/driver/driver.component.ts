import { Component, OnInit } from '@angular/core';
import { Driver } from '../classes/driver';
import { DriversService } from '../drivers.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-driver',
  templateUrl: './driver.component.html',
  styleUrls: ['./driver.component.css']
})
export class DriverComponent implements OnInit {

  driver!: Driver;
  isLogedin!: boolean;
  editPage: boolean = false;

  constructor(private driverService: DriversService,
     private router: Router,
      private route: ActivatedRoute,
      private authenticationSerivce: AuthenticationService
      ) { }

  editDriver() {
    this.editPage = true;
  }

  onEdit() {

  }

  backButton() {
    this.editPage = false;
  }

  deleteDriver() {
    
  }

  ngOnInit(): void {
    this.isLogedin = this.authenticationSerivce.isLoggedIn;

    this.driverService.getDriverById(this.route.snapshot.params["teamId"], this.route.snapshot.params["driverId"]).subscribe({
      next: (driver) => {
        this.driver = driver;
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {
        console.log("completed");
      }
    })
  }
}
