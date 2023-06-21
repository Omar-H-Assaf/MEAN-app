import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { UsersDataService } from '../users-data.service';
import { Users } from '../classes/users';
import { AuthenticationService } from '../authentication.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  email = new FormControl();
  password = new FormControl();
  email2 = new FormControl();
  password2 = new FormControl();
  firstName = new FormControl();
  lastName = new FormControl();
  user: Users =  new Users();
  isLogin: boolean = true;

  constructor(private route: ActivatedRoute,
    private userService: UsersDataService,
    private router: Router,
    private authenticationSerivce: AuthenticationService) { }

  signIn() {
    if (!this.isLogin) {
      this.isLogin = true;
    }
  }

  register() {
    if (this.isLogin) {
      this.isLogin = false;
    }
  }

  onLogin() {
    if (this.isLogin) {
      this.user.email = this.email.value;
      this.user.password = this.password.value;

      this.userService.loginUser(this.user.toJSON()).subscribe({
        next: (token) => {
          if (token) {
            this.authenticationSerivce.token = token.toString();
            this.router.navigateByUrl(environment.navigateHome);
          }
        },
        error: (error) => {
          console.log(error.error);

        }
      })
    } else {
      this.user.email = this.email2.value;
      this.user.password = this.password2.value;
      this.user.firstName = this.firstName.value;
      this.user.lastName = this.lastName.value;
            
      this.userService.register(this.user.toJSON()).subscribe({
        next: () => {
          this.isLogin = true;
        },
        error: (error) => {
          console.log(error.error);

        }
      })
    }

  }
}
