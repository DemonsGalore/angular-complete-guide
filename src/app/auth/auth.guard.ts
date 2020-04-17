import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, UrlTree } from '@angular/router';
import { map, take } from 'rxjs/operators';
import { Observable } from 'rxjs';

import * as fromApp from 'app/store/app.reducer';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(
    private store: Store<fromApp.ApplicationState>,
    private router: Router
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> {
    return this.store.select('auth').pipe(
      take(1),
      map(state => {
        if (!!state.user) {
          return true;
        }
        return this.router.createUrlTree(['/auth']);
      })
    );
  }
}
