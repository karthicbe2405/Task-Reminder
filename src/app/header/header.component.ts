import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../store/app.reducer';
import * as AuthActions from '../auth/store/auth.actions'
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  loggedIn : Boolean = false;
  subscripton : Subscription;

  constructor(private store : Store<AppState>,private router:Router) { }

  ngOnInit(): void {
    this.subscripton = this.store.select('auth').subscribe( (state) => {
      
      if(state.user){
        this.loggedIn = true;
      }
      else{
        this.loggedIn = false;
      }

    });
  }

  logout(){
    this.store.dispatch(new AuthActions.Logout());
    localStorage.removeItem('user');
    this.router.navigate(['auth']);
  }

  ngOnDestroy(){
    this.subscripton.unsubscribe();
  }

}
