import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { User } from '../../model/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = environment.backend.url;

  constructor(private http: HttpClient) {}

  getUsers(): Observable<any> {
    return this.http.get(`${this.apiUrl}/api/v1/users`);
  }

  getUser(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/api/v1/users/${id}`);
  }

  getMyUser(user: User): Observable<any> {
    return this.http.post(`${this.apiUrl}/api/v1/users/me`, user);
  }

  saveUser(user: User): Observable<any> {
    console.log(user)
    return this.http.post(`${this.apiUrl}/api/v1/users`, user);
  }
}