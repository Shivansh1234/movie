import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse } from 'src/app/core/models/api-response';
import { User } from 'src/app/core/models/user';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) { }

  sampleReq(pageSize: number, cursorId: string, cursorDir: string): Observable<any> {
    let params = new HttpParams().set('limit', pageSize).set('cursorId', cursorId).set('cursorDir', cursorDir);
    return this.http.get<any>('http://localhost:5000/api/admin/info', { params });
  }
}
