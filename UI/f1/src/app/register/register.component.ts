import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersDataService } from '../users-data.service';
import { Users } from '../classes/users';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  email = new FormControl();
  password = new FormControl();
  firstName = new FormControl();
  lastName = new FormControl();
  user!:Users;
  isRegister: boolean = true;

  constructor(private route: ActivatedRoute,
     private userService: UsersDataService,
      private router: Router,
    private authenticationSerivce: AuthenticationService) {}

  signIn() {
    if (!this.isRegister) {
      this.isRegister = true;
    }
  }

  register() {
    if (this.isRegister) {
      this.isRegister = false;
    }
  }

  onLogin() {
    this.user = new Users(this.email.value, this.password.value)
    this.userService.loginUser(this.user.toJSON()).subscribe({
      next: (result) => {
        if (result === "Authorized") {
          this.authenticationSerivce.isLoggedIn = true;
          this.router.navigateByUrl('/');
        }
      },
      error: (error) => {
        console.log(error.error);
        
      },
      complete: () => {

      }
    })
  }
}
