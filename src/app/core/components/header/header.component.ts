import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';

import { DataStorageService } from 'app/services';
import * as fromApp from 'app/store/app.reducer';
import * as AuthActions from 'app/auth/store/auth.actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  private userSubscription: Subscription;
  isAuthenticated = false;

  chevronDown = faChevronDown;

  constructor(
    private store: Store<fromApp.ApplicationState>,
    private dataStorageService: DataStorageService
  ) {}

  ngOnInit() {
    this.userSubscription = this.store.select('auth').subscribe(state => {
      this.isAuthenticated = !!state.user;
    });
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }

  onSaveData() {
    this.dataStorageService.storeRecipes();
  }

  onFetchData() {
    this.dataStorageService.fetchRecipes().subscribe();
  }

  onSignOut() {
    this.store.dispatch(new AuthActions.SignOut());
  }
}
