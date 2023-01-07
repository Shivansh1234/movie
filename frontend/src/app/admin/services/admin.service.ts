import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { ApiResponse } from 'src/app/core/models/api-response';
import { User } from 'src/app/core/models/user';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) { }

  getUserListRequest(filterValue: string, pageSize: number, cursorId: string, cursorDir: string): Observable<ApiResponse<User[]>> {
    let params = new HttpParams().set('search', filterValue).set('limit', pageSize).set('cursorId', cursorId).set('cursorDir', cursorDir);
    return this.http.get<ApiResponse<User[]>>('http://localhost:5000/api/admin/info', { params }).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    // Return an observable with a user-facing error message.
    return throwError(() => error.error);
  }
}
