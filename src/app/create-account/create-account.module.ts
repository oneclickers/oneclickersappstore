import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateAccountComponent } from './create-account.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NbButtonModule, NbCardModule, NbIconModule, NbInputModule, NbLayoutModule, NbListModule, NbOverlayContainer, NbOverlayModule, NbProgressBarModule, NbSelectModule, NbStepperModule, NbThemeModule, NbToastrModule } from '@nebular/theme';

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
    NbStepperModule,
    NbIconModule,
    NbInputModule,
    NbProgressBarModule,
    NbListModule,
    NbSelectModule,
  ]
})
export class CreateAccountModule { }
