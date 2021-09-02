import { Component, OnDestroy, OnInit } from '@angular/core';
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
export class AuthComponent implements OnInit, OnDestroy {

  loginForm !: FormGroup;
  loginMode : boolean = true;
  subscription : Subscription;
  
  constructor(private userService : UserService,private store : Store<{auth:AuthReducer.State}>,private router:Router) { }

  ngOnInit(): void {
    
    if(localStorage.getItem('user'))
      this.store.dispatch(new AuthActions.Login(JSON.parse(localStorage.getItem('user'))));

    this.subscription = this.store.select('auth').subscribe( (data) => {
      if(data.user)
        this.router.navigate(['tasks']);
    });
    this.initForm();
  }

  initForm(){
    
    if(this.loginMode){
      this.loginForm = new FormGroup({
        email : new FormControl('',[Validators.required,Validators.email]),
        password : new FormControl('',Validators.required)
      });
    }
    else{
      this.loginForm = new FormGroup({
        username : new FormControl('',Validators.required),
        email : new FormControl('',[Validators.required,Validators.email]),
        password : new FormControl('',Validators.required)
      });
    }

  }

  onSubmit(){

    if(this.loginMode && !this.userService.login(this.loginForm.value)){
      alert('Invlid Usernma or Password');
    }
    else if(!this.loginMode){
      if(this.userService.register(this.loginForm.value))
        alert('Signup Sucess');
      this.loginMode = true;
      this.initForm();
    }

  }

  switch(){
    this.loginMode = !this.loginMode;
    this.initForm();
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

}
