import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateAccountComponent } from './create-account.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NbButtonModule, NbCardModule, NbLayoutModule, NbOverlayContainer, NbOverlayModule, NbStepperModule, NbThemeModule, NbToastrModule } from '@nebular/theme';

const routes:Routes=[
  {
    path:'',component:CreateAccountComponent,
    children:[
      {
        path:'',redirectTo:'Login',pathMatch:'full'
      },
      {
        path:'Login',component:LoginComponent
      },
      {
        path:'Register',component:RegisterComponent
      }
    ]
  }
]

@NgModule({
  declarations: [
    CreateAccountComponent,
    LoginComponent,
    RegisterComponent,
    
  ],
  imports: [
    CommonModule,
    FormsModule,
    NbCardModule,
    NbButtonModule,
    RouterModule.forChild(routes),
    NbThemeModule.forRoot(),
    NbLayoutModule,
    ReactiveFormsModule,
    NbToastrModule.forRoot(),
    NbStepperModule
  ]
})
export class CreateAccountModule { }
