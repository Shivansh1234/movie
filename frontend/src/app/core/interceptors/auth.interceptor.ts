import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../../core/services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    // Get the auth token from the service.
    const authToken = this.authService.getUserToken();

    // Clone the request and replace the original headers with
    // cloned headers, updated with the authorization.
    if (!!authToken) {
      request = request.clone({
        headers: request.headers.set('Authorization', `Bearer ${authToken}`)
      });
    }

    // send cloned request with header to the next handler.
    return next.handle(request);
  }
}
