import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavigationComponent } from './navigation/navigation.component';
import { HomeComponent } from './home/home.component';
import { TeamsComponent } from './teams/teams.component';
import { HttpClientModule } from '@angular/common/http';
import { TeamComponent } from './team/team.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddTeamComponent } from './add-team/add-team.component';
import { RegisterComponent } from './register/register.component';
import { DriverComponent } from './driver/driver.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { EditTeamComponent } from './edit-team/edit-team.component';
import { EditDriverComponent } from './edit-driver/edit-driver.component';
import { AddDriverComponent } from './add-driver/add-driver.component';
import { FooterComponent } from './footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    HomeComponent,
    TeamsComponent,
    TeamComponent,
    AddTeamComponent,
    RegisterComponent,
    DriverComponent,
    ErrorPageComponent,
    EditTeamComponent,
    EditDriverComponent,
    AddDriverComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
