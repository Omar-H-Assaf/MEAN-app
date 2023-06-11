import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-add-team',
  templateUrl: './add-team.component.html',
  styleUrls: ['./add-team.component.css']
})
export class AddTeamComponent {
  teamName = new FormControl('');

  onAdd() {
    
  }

  updateName() {
    console.log(this.teamName.value); 
  }
}
