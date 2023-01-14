import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { ApiResponse } from 'src/app/core/models/api-response';
import { Post } from 'src/app/core/models/post';

@Injectable({
  providedIn: 'root'
})
export class AuthorService {

  constructor(private http: HttpClient) { }

  createPostRequest(postData: Post): Observable<ApiResponse<Post>> {
    return this.http.post<ApiResponse<Post>>('http://localhost:5000/api/author/createPost', postData).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    // Return an observable with a user-facing error message.
    return throwError(() => error.error);
  }
}
