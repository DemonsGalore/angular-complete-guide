import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { HttpInterceptor, HttpParams, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { take, exhaustMap, map } from 'rxjs/operators';

import * as fromApp from 'app/store/app.reducer';
import { AuthState } from './store/auth.reducer';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
  constructor(private store: Store<fromApp.ApplicationState>) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return this.store.select('auth').pipe(
      take(1),
      map((state: AuthState) => state.user),
      exhaustMap(user => {
        if (!user) {
          return next.handle(req);
        }

        const modifiedReq = req.clone({ params: new HttpParams().set('auth', user.token)})
        return next.handle(modifiedReq);
      })
    );
  }
}
