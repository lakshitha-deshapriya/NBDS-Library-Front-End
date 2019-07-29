import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment.prod';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AuthLoginInfo} from '../models/login-info';
import {JwtResponse} from '../models/jwt-response';
import {Observable} from 'rxjs';
import {SignUpInfo} from '../models/signup-info';
import {User} from '../models/User';
import {Router} from '@angular/router';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseURL = environment.baseURL;

  isLoggedIn = false;
  user: User;

  constructor(private http: HttpClient, private router: Router) {
  }

  attemptAuth(credentials: AuthLoginInfo): Observable<User> {
    return this.http.post<User>(this.baseURL + 'auth/login', credentials, {responseType: 'json'});
  }

  register(info: SignUpInfo): Observable<string> {
    return this.http.post(this.baseURL + 'auth/signup', info, {responseType: 'text'});
  }

  setLogInStatus( status: boolean ) {
    this.isLoggedIn = status;
  }

  validateLogIn() {
    if (!this.isLoggedIn) {
      this.router.navigate(['/']);
    }
  }
}
