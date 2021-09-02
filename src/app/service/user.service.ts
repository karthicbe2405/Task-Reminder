import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { User } from '../models/user.model';
import * as AuthActions from '../auth/store/auth.actions';
import { AppState } from '../store/app.reducer';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  
  userUpdate =  new Subject<User[]>();

  constructor(private store : Store<AppState>) { }

  users : User[] = [
    {
        id: 1,
        email: "aravind@maximl.com",
        username: "Aravind"
    },
    {
        id: 2,
        email: "lakshman@maximl.com",
        username: "Lakshman"
    },
    {
        id: 3,
        email: "hari@maximl.com",
        username: "Hari"
    },
    {
        id: 4,
        email: "kumar@maximl.com",
        username: "Kumar"
    }
];

  getUsers(){
    return this.users.slice();
  }

  login(userInput : {email : string,password : string}){

    let loginStatus : boolean =  false;
    this.users.forEach((user) => {
      if(user.email === userInput.email && userInput.password === "123"){
          this.store.dispatch(new AuthActions.Login(user));
          localStorage.setItem('user',JSON.stringify(user));
          loginStatus=true;
      }
    });
    return loginStatus;
  }

  register(userInput : {email : string,password : string,username : string}){
    this.users.push({id : this.users.length + 1,username : userInput.username,email:userInput.email});
    this.userUpdated;
    return true;
  }
  
  userUpdated(){
    this.userUpdate.next(this.users.slice());
  }

}
