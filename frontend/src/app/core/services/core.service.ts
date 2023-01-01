import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse } from 'src/app/core/models/api-response';
import { User } from 'src/app/core/models/user';

@Injectable({
  providedIn: 'root'
})
export class CoreService {

  constructor(private http: HttpClient) { }

  userLogin(loginData: Partial<{ email: string; password: string; }>): Observable<ApiResponse<{ token: string, role: boolean }>> {
    return this.http.post<any>(`http://localhost:5000/api/user/login`, loginData);
  }

  userRegister(userData: Partial<{ fname: string | null; lname: string | null; email: string | null; password: string | null; }>): Observable<ApiResponse<User>> {
    return this.http.post<ApiResponse<User>>('http://localhost:5000/api/user/register', userData);
  }
}
