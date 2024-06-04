import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { tap } from 'rxjs/operators';
import { ILoginFormState } from '../login/state/loginForm';
import { Observable } from 'rxjs';

const url = "http://localhost:3000"

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  httpClient = inject(HttpClient);

  createLogin(data: ILoginFormState): Observable<ILoginFormState> {
    return this.httpClient.post<ILoginFormState>(`${url}/login`, data)
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

}
