import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { AuthComponent } from './auth.component';
import { RouterModule, Routes } from '@angular/router';

const route : Routes = [
  {path:'auth',component:AuthComponent}
];

@NgModule({
  declarations: [
    AuthComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(route)
  ],
  exports : [
    AuthComponent
  ]
})
export class AuthModule { }
