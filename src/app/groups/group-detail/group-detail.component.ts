import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { MdDialog } from '@angular/material';
import { GroupService } from '../shared/group.service';
import { AuthService } from '../../shared/auth/auth.service';
import { InviteToGroupComponent } from '../invite-to-group/invite-to-group.component';
import { Group } from '../shared/group';
import { Profile } from '../shared/profile';

import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-group-detail',
  templateUrl: './group-detail.component.html',
  styleUrls: ['./group-detail.component.scss']
})
export class GroupDetailComponent implements OnInit {

  group: Group = <Group>{};
  userProfile: Profile = <Profile>{};
  ruleRows: number = 1;
  loading: boolean = true;
  viewAllActions: boolean = false;
  hideActionsIntent: boolean = false;

  constructor(
    private groupService: GroupService,
    private route: ActivatedRoute,
    private authService: AuthService,
    public dialog: MdDialog
  ) { }

  ngOnInit() {
    this.route.params
        .switchMap( (params: Params) => this.groupService.getGroup(params['id']))
        .subscribe( (group: Group) => {
          this.loading = false;
          this.group = group;
          this.userProfile = this.group.profiles.find( profile => profile.id === this.authService.user.id);
          this.adjustRulesLines();
        });
  }

  updateGroup(): void {
    this.groupService
        .updateGroup(this.group)
        .subscribe( (group: Group) => {
          console.log('group updated', group);
        });
  }

  adjustRulesLines(): void {
    this.ruleRows = this.group.rules.split(/\r\n|\r|\n/).length;
  }

  showInviteToGroup(): void {
    this.dialog.open(InviteToGroupComponent);
  }

  public showAllActions(): void {
    this.viewAllActions = true;
    this.hideActionsIntent = false;
    setTimeout( () => this.hideActionsIntent = false, 200);
  }

  public hideActions(): void {
    this.viewAllActions = false;
    setTimeout( () => this.hideActionsIntent ? this.viewAllActions = false : '', 500);
  }

}
