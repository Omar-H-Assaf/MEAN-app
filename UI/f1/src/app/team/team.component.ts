import { Component, Input, OnInit } from '@angular/core';
import { TeamsDataService } from '../teams-data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { Team } from '../classes/team';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css']
})
export class TeamComponent implements OnInit{
  team!: Team;

  myForm!: FormGroup;

  constructor(private route: ActivatedRoute, private teamService: TeamsDataService, private router: Router) {
    this.team = new Team();
  }  

  showLabel: boolean = false;
  buttonText: string = "Edit"

  onClickEdit() {
    this.showLabel = true;
    this.buttonText = "Save";
  }

  getTeamID() {
    return this.route.snapshot.params["teamId"];
  }

  onClickDelete() {
    this.teamService.deleteTeamsByID(this.getTeamID()).subscribe(msg => {
      this.router.navigateByUrl('/teams');
    })
  }

  getTeam() {
    this.teamService.getTeamsByID(this.getTeamID()).subscribe(
      {
        next : (team) => {
          this.team = team;
          this.myForm = new FormGroup({
            teamName: new FormControl(this.team.teamName),
          });
        },
        error : (err) => {
          console.log(err);
        },
        complete : () => {
          console.log("completed");
        }
     }
     );
  }

  onSubmit(form: FormGroup) {
    this.teamService.updateTeamsByID(this.getTeamID(), form.value).subscribe(team => {
      this.team = team;
      this.showLabel = false;
      this.buttonText = "Edit";
      this.getTeam();
    })
  }

  ngOnInit(): void {
    this.getTeam();
  }

}
