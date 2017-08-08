import {Component, OnInit} from '@angular/core';
import {AdminUserService} from './admin.user.service';
import {AdminUsers} from '../../../../dto/admin.users.DTO';
import {ORLPService} from '../../../../services/orlp.service';
import {ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-one-user',
  providers: [AdminUserService],
  templateUrl: ('./admin.user.component.html'),
  styleUrls: ['../../admin.style.css']
})

export class AdminUserComponent implements OnInit {
  private user: AdminUsers;
  private errorMessage: string;
  private sub: Subscription;
  private url: string;
  private clickedButton: boolean;

  constructor(private route: ActivatedRoute,
              private orlp: ORLPService,
              private adminUserSevice: AdminUserService) {
  }

  ngOnInit(): void {
    this.sub = this.route.params.subscribe(
      params => {
        const url = params['url'];
        this.url = url;
      }
    );
    this.takeUser();
  }

  private takeUser() {
    this.decodeLink();
    this.adminUserSevice.getUser(this.url).subscribe(
      user => this.user = user,
      error => this.errorMessage = <any>error
    );
  }

  private decodeLink() {
    this.url = this.orlp.decodeLink(this.url);
  }

  updateAccountState(currentUser: AdminUsers) {
    this.adminUserSevice.updateAccountState(currentUser, this.url).subscribe(
      user => this.user = user,
      error => console.log(error)
    );
  }

  deleteAccountState() {
    this.adminUserSevice.deleteAccountState(this.url).subscribe(
      user => this.user = user,
      error => console.log(error)
    );
  }

  toggleDelete() {
    this.clickedButton = true;
  }

  toggleUp() {
    this.clickedButton = false;
  }

  onOK(currentUser: AdminUsers) {
    switch (currentUser.accountStatus) {
      case 'ACTIVE': {
        if (this.clickedButton) {
          this.deleteAccountState();
        } else {
          this.updateAccountState(currentUser);
        }
        break;
      }

      case 'DELETED': {
        this.deleteAccountState();
        break;
      }

      case 'BLOCKED': {
        this.updateAccountState(currentUser);
        break;
      }
    }
  }
}