import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from '../entity/user.entity';
import {environment} from '../../environments/environment';

@Injectable({
        providedIn: 'root'
})
export class UsersService {

        constructor(private http: HttpClient) {
        }

        addUser(user: User) {
                return this.http.post(environment.apiPrefix + '/user', user);
        }

        getCurrentUser() {
                return this.http.get<User>(environment.apiPrefix + '/user/current');
        }
}
