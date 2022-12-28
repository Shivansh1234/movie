import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor(private http: HttpClient) { }

  userLogin(data: any) {
    return this.http.post(`http://localhost:5000/api/user/login`, data);
  }

  userRegister(data: any) {
    return this.http.post('http://localhost:5000/api/user/register', data);
  }
}
