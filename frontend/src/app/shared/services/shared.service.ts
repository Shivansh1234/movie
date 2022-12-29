import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../models/user';
import { Observable } from 'rxjs';
import { ApiResponse } from '../models/api-response';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor(private http: HttpClient) { }

  userLogin(loginData: User) {
    return this.http.post(`http://localhost:5000/api/user/login`, loginData);
  }

  userRegister(userData: User): Observable<ApiResponse<User>> {
    return this.http.post<ApiResponse<User>>('http://localhost:5000/api/user/register', userData);
  }
}
