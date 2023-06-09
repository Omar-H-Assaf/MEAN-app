import { Component, OnInit } from '@angular/core';
import { Driver } from '../classes/driver';
import { DriversService } from '../drivers.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-driver',
  templateUrl: './driver.component.html',
  styleUrls: ['./driver.component.css']
})
export class DriverComponent implements OnInit {

  driver!: Driver;

  constructor(private driverService: DriversService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
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
