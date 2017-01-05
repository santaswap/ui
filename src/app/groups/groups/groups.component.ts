import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MdDialog } from '@angular/material';

import { GroupService } from '../shared/group.service';
import { Group } from '../shared/group';
import { AddGroupComponent } from '../add-group/add-group.component';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.scss']
})
export class GroupsComponent implements OnInit {
  
  groups: Group[] = [];
  loading: boolean = true;
  
  constructor(
    private groupService: GroupService,
    public dialog: MdDialog
  ) { }

  ngOnInit () {
    this.groupService.getAll()
      .subscribe( groups => {
        this.loading = false;
        this.groups = groups;
      });
  }

  public addGroup(): void {
    let addGroup = this.dialog.open(AddGroupComponent);
  }

}
