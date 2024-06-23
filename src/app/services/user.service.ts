import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IUser } from '../models/user';
import { Observable } from 'rxjs';

const url = "http://localhost:8000";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  userArr: IUser[] = [];

  http = inject(HttpClient);

  getUsers(): Observable<IUser[]> {
    return this.http.get<IUser[]>(`${url}/users`);
  }

}
