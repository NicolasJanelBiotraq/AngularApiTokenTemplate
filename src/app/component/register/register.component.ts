import {Component, OnInit} from '@angular/core';
import {UsersService} from '../../service/users.service';
import {User} from '../../entity/user.entity';
import {SecurityService} from '../../service/security.service';

@Component({
        selector: 'app-register',
        templateUrl: './register.component.html',
        styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

        user: User = new User();

        constructor(private userService: UsersService, private securityService: SecurityService) {
        }

        // si on est connecté en arrivant sur cette route, on se déconnecte avant tout
        ngOnInit(): void {
                if (this.securityService.isConnected()) {
                        this.securityService.logout();
                }
        }

        addUser() {
                this.userService.addUser(this.user).subscribe(() => {
                        // l'utilisateur est créé
                });
        }

}
