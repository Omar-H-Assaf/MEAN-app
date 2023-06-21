import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { TeamsComponent } from './teams/teams.component';
import { TeamComponent } from './team/team.component';
import { AddTeamComponent } from './add-team/add-team.component';
import { RegisterComponent } from './register/register.component';
import { DriverComponent } from './driver/driver.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { EditTeamComponent } from './edit-team/edit-team.component';
import { EditDriverComponent } from './edit-driver/edit-driver.component';
import { AddDriverComponent } from './add-driver/add-driver.component';

const routes: Routes = [
  {
    path: "",
    component: HomeComponent
  },
  {
    path: "teams",
    component: TeamsComponent
  },
  {
    path: "teams/:teamId",
    component: TeamComponent
  },
  {
    path: "add-team",
    component: AddTeamComponent
  },
  {
    path: "register",
    component: RegisterComponent
  },
  {
    path: "teams/:teamId/drivers/:driverId",
    component: DriverComponent
  },
  {
    path: "teams/:teamId/drivers/:driverId/edit",
    component: EditDriverComponent
  },
  {
    path: "teams/:teamId/edit",
    component: EditTeamComponent
  },
  {
    path: "add-driver",
    component: AddDriverComponent,
  },
  {
    path: "**",
    component: ErrorPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
