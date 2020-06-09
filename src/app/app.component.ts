import {Component, OnInit} from '@angular/core';
import {SecurityService} from './service/security.service';
import {Router} from '@angular/router';

@Component({
        selector: 'app-root',
        templateUrl: './app.component.html',
        styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

        loading: boolean = true;

        constructor(private securityService: SecurityService, private router: Router) {
        }

        ngOnInit(): void {
                this.loading = true;
                // vérifie si on est déja connecté depuis le localstorage
                this.securityService.restoreConnection().subscribe(()=>{
                        this.loading = false;
                });
        }

        get isConnected() {
                return this.securityService.isConnected();
        }

        get currentUser() {
                return this.securityService.getCurrentUser();
        }

        logout() {
                this.securityService.logout();
                this.router.navigate(['/']);
        }
}
