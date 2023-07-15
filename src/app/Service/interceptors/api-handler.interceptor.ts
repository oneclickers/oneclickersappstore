import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, } from 'rxjs';
import { environment } from '../../../environments/environment';
import { retry } from 'rxjs/internal/operators/retry';

@Injectable()
export class ApiHandlerInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    console.log("request",request.url);
    
    const modifyURL:any=request.clone({
      url:`${environment.baseURL}${request.url}`
    })
    console.log("url",modifyURL);
    
    return next.handle(modifyURL).pipe(retry(1))
  }
}
