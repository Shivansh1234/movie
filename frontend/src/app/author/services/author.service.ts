import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { ApiResponse } from 'src/app/core/models/api-response';
import { environment } from 'src/environments/environment';
import { Post } from '../models/post';

@Injectable({
  providedIn: 'root'
})
export class AuthorService {

  constructor(private http: HttpClient) { }

  getPostsRequest(): Observable<ApiResponse<Post[]>> {
    return this.http.get<ApiResponse<Post[]>>(`${environment.apiURL}author/getPosts`).pipe(
      catchError(this.handleError)
    );
  }

  getPostDetailRequest(postId: string): Observable<ApiResponse<Post>> {
    return this.http.get<ApiResponse<Post>>(`${environment.apiURL}author/postDetail/${postId}`).pipe(
      catchError(this.handleError)
    );
  }

  createPostRequest(postData: Post): Observable<ApiResponse<Post>> {
    return this.http.post<ApiResponse<Post>>(`${environment.apiURL}author/createPost`, postData).pipe(
      catchError(this.handleError)
    );
  }

  deletePostRequest(postId: string): Observable<ApiResponse<void>> {
    return this.http.delete<ApiResponse<void>>(`${environment.apiURL}author/deletePost/${postId}`).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    // Return an observable with a user-facing error message.
    return throwError(() => error.error);
  }
}
