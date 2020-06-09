import {Component, OnInit} from '@angular/core';
import {User} from '../../entity/user.entity';
import {HttpClient} from '@angular/common/http';
import {UsersService} from '../../service/users.service';
import {SecurityService} from '../../service/security.service';

@Component({
        selector: 'app-my-account',
        templateUrl: './my-account.component.html',
        styleUrls: ['./my-account.component.scss']
})
export class MyAccountComponent implements OnInit {

        user: User;

        constructor(private securityService: SecurityService) {
        }

        ngOnInit(): void {
               this.user = this.securityService.getCurrentUser();
        }
}
