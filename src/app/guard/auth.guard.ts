import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {SecurityService} from '../service/security.service';

@Injectable({
        providedIn: 'root'
})
export class AuthGuard implements CanActivate {

        constructor(private securityService: SecurityService) {
        }

        /**
         * Renvoie true si on peut acceder à la route, false si on n'a pas le droit
         */
        canActivate() {
                return this.securityService.isConnected();
        }

}
