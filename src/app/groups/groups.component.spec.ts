import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SharedModule } from '../shared/shared.module';

import { RouterTestingModule } from '@angular/router/testing';
import { GroupsComponent } from './groups.component';
import { GroupCardComponent } from '../group-card/group-card.component';
import { AuthService } from '../auth/auth.service';
import { GroupMembersPipe } from '../group-card/group-members.pipe';

describe('GroupsComponent', () => {
  let component: GroupsComponent;
  let fixture: ComponentFixture<GroupsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [GroupsComponent, GroupCardComponent, GroupMembersPipe],
      imports: [RouterTestingModule, SharedModule],
      providers: [AuthService]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
