import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { User } from '../models/user.model';
import * as AuthActions from '../auth/store/auth.actions';
import { AppState } from '../store/app.reducer';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  
  constructor(private store : Store<AppState>) { }

  users : User[] = [
    {
        id: 1,
        email: "akash.agrawal@maximl.com",
        username: "akash"
    },
    {
        id: 2,
        email: "sakshee.jain@maximl.com",
        username: "sakshee"
    },
    {
        id: 3,
        email: "hari@maximl.com",
        username: "utkarsh"
    },
    {
        id: 4,
        email: "raghul.r@maximl.com",
        username: "raghul"
    }
];

  getUsers(){

    return this.users.slice();

  }

  login(userInput : {username : string,password : string}){

    this.users.forEach((user) => {

      if(user.email === userInput.username && userInput.password === "123"){
          this.store.dispatch(new AuthActions.Login(user));
          localStorage.setItem('user',JSON.stringify(user));
          return;
      }
    });

  }
}
