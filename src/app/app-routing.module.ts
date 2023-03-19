import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import {
  NbAuthComponent,
  NbLoginComponent,
  NbLogoutComponent,
  NbRegisterComponent,
  NbRequestPasswordComponent,
  NbResetPasswordComponent,
} from '@nebular/auth';
import { AdminModule } from './admin/admin.module';

export const routes: Routes = [
  
  {
    path:'',loadChildren:()=>import('./create-account/create-account.module').then(LoadModule=>LoadModule.CreateAccountModule)
  },
  {
    path:'Admin',loadChildren:()=>import('./admin/admin.module').then(LoadModule=>LoadModule.AdminModule)
  },
  {
    path:'Tutor',loadChildren:()=>import('./tutor/tutor.module').then(LoadModule=>LoadModule.TutorModule)
  },
  {
    path:'Student',loadChildren:()=>import('./student/student.module').then(LoadModule=>LoadModule.StudentModule)
  },

 
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
  constructor(){
    console.log("appmodule");
    
  }
}
