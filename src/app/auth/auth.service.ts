import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { tap } from 'rxjs/operators';
import { ILoginFormState } from '../models/loginForm';
import { Observable } from 'rxjs';
import { IRegisterFormState } from '../models/registerForm';

const url = "http://localhost:8000"

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  httpClient = inject(HttpClient);

  createUser(data: IRegisterFormState): Observable<IRegisterFormState> {
    return this.httpClient.post<IRegisterFormState>(`${url}/users`, data)
     .pipe(tap((result) => {
        localStorage.setItem('register', JSON.stringify(result));
      }));
  }

  createLogin(data: ILoginFormState) {
    return this.httpClient.post(`${url}/login`, data)
      .pipe(tap((result) => {
        localStorage.setItem('login', JSON.stringify(result));
      }));
  }

  logout() {
    localStorage.removeItem('login');
  }

  isLoggedIn() {
    return localStorage.getItem('login') !== null;
  }

  isTheUserRegistered() {
    return localStorage.getItem('register')!== null;
  }

}
