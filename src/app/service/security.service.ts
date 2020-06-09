import {Injectable} from '@angular/core';
import {User} from '../entity/user.entity';
import {HttpClient} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {flatMap, tap} from 'rxjs/operators';
import {environment} from '../../environments/environment';
import {UsersService} from './users.service';

const FAKE_CONNECTION_MODE = false;

const TOKEN_LOCALSTORAGE_KEY = 'token';
const USER_LOCALSTORAGE_KEY = 'user';

/**
 * Ce service gère la sécurité dans l'application par l'authentification d'un utilisateur
 */
@Injectable({
        providedIn: 'root'
})
export class SecurityService {

        // l'utilisateur connecté
        private user: User;

        // code unique qui permet de s'authentifier avec le serveur
        // (récupéré après un login)
        private token: string = null;

        constructor(private http: HttpClient, private userService: UsersService) {
        }

        login(username: string, plainPassword: string): Observable<any> {
                // vrai code de connexion :)
                return this.http.post<{ token: string }>(environment.apiPrefix + '/login_check', {
                        username: username,
                        password: plainPassword
                })
                        .pipe(
                                // la réponse du serveur en cas de connexion avec succès : {token: 13216516515, user: {email:......}
                                flatMap(result => {
                                        this.setToken(result.token);

                                        // charger l'utilsiateur courant
                                        return this.userService.getCurrentUser();
                                }),
                                tap(value => {
                                        this.user = value;
                                })
                        );
        }

        setToken(token) {
                this.token = token;
                localStorage.setItem(TOKEN_LOCALSTORAGE_KEY, JSON.stringify(this.token));
        }

        isConnected() {
                return this.token !== null && this.user !== null;
        }

        logout() {
                this.token = null;
                localStorage.removeItem(TOKEN_LOCALSTORAGE_KEY);
        }

        getCurrentUser(): User {
                return this.user;
        }

        refreshCurrentUser() {
                this.userService.getCurrentUser().subscribe(value => {
                        this.user = value;
                });
        }

        getToken() {
                return this.token;
        }

        /**
         * Vérifie si un token/user est dans le localstorage ret si oui les enregistre
         */
        restoreConnection(): Observable<any> {
                const token = localStorage.getItem(TOKEN_LOCALSTORAGE_KEY);
                if (token) {
                        this.token = JSON.parse(token);
                        return this.userService.getCurrentUser()
                                .pipe(tap(value => {
                                        this.user = value;
                                }))
                }
                else {
                        return of("");
                }
        }
}
