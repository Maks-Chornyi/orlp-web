import {Component, Input, OnInit} from "@angular/core";
import {AdminUsersService} from "./admin.users.service";
import {AdminUsers} from "../../../classes/admin.users.DTO";
import {ORLPService} from "../../../orlp.service";
import {Link} from "../../../classes/link";

@Component({
    selector: "admin-all-users",
    providers: [AdminUsersService],
    template: require('app/page/admin/users/admin.users.component.html!text'),
    styleUrls: ['app/page/admin/admin.style.css']
})

export class AdminUsersComponent implements OnInit {
    users: AdminUsers[];
    errorMessage: string;

    constructor(private orlp: ORLPService,
                private adminUsersSevice: AdminUsersService) {}

    ngOnInit(): void {
        this.adminUsersSevice.getUsers()
            .subscribe(users => this.users = users,
                error => this.errorMessage = <any>error);
    }

    public getUserLink(link: Link): string {
        console.log('LINK : ' + link.href);
        console.log('Code : ' + this.orlp.getShortLink(link));
        return this.orlp.getShortLink(link);
    }
}