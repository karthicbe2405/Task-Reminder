import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { UserService } from '../service/user.service';
import * as AuthReducer from '../auth/store/auth.reducer';
import { Router } from '@angular/router';
import * as AuthActions from './store/auth.actions'
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  loginForm !: FormGroup;
  subscription : Subscription;
  
  constructor(private userService : UserService,private store : Store<{auth:AuthReducer.State}>,private router:Router) { }

  ngOnInit(): void {
    
    if(localStorage.getItem('user')){
      this.store.dispatch(new AuthActions.Login(JSON.parse(localStorage.getItem('user'))));
    }
    this.store.select('auth').subscribe( (data) => {

      if(data.user){
        this.router.navigate(['tasks']);
      }
      else{
        console.log("Login Failed");
      }

    });

    this.initForm();

  }

  initForm(){
    this.loginForm = new FormGroup({

      username : new FormControl('',Validators.required),
      password : new FormControl('',Validators.required),

    });
  }

  onSubmit(){
      this.userService.login(this.loginForm.value);
  }

}
