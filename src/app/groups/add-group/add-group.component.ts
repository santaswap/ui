import { Component } from '@angular/core';
import { MdDialogRef } from '@angular/material';
import { Router } from '@angular/router';
import { GroupService } from '../shared/group.service';
import { Group } from '../shared/group';
import { AuthService } from '../../shared/auth/auth.service';

@Component({
  selector: 'app-add-group',
  templateUrl: './add-group.component.html',
  styleUrls: ['./add-group.component.scss']
})
export class AddGroupComponent {

  name: string = '';

  constructor(
    public dialogRef: MdDialogRef<AddGroupComponent>,
    private groupService: GroupService,
    public router: Router,
    private authService: AuthService
  ) { }

  public saveGroup(): void {
    let group = { name: this.name };
    let profile = {
      name: this.authService.getUser().name,
      id: this.authService.getUser().id,
      picture: this.authService.getUser().picture
    };
    this.groupService
        .createAndJoinGroup(group, profile)
        .subscribe( group => this.navigateToGroup(group));
  }

  private navigateToGroup(group: Group) {
    this.dialogRef.close(group.name);
    this.router.navigate(['/groups', group.id]);
  }

}
