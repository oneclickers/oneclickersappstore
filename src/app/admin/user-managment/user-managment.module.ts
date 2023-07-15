import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { NbButtonModule, NbCardModule, NbChatModule,  NbDialogModule, NbIconModule, NbLayoutModule, NbMenuModule, NbSelectModule, NbSidebarModule, NbStepperModule, NbTabsetModule, NbToastrModule, NbToggleModule, NbWindowModule } from '@nebular/theme';
import { ThemeModule } from '../../@theme/theme.module';
import { AngularPaginatorModule } from 'angular-paginator';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { PickerModule } from '@ctrl/ngx-emoji-mart';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserManagmentComponent } from './user-managment.component';
import { AddNewUserComponent } from './add-new-user/add-new-user.component';
import { AddUserRoleComponent } from './add-user-role/add-user-role.component';


const routes:Routes=[
  {
    path:'',
    component:UserManagmentComponent,
    children:[
      {
        path:'',redirectTo:'User-Roll',pathMatch:'full',
      },
    
      {
        path:'Add-User',component:AddNewUserComponent,
      },
      {
        path:'Add-User-Role',component:AddUserRoleComponent,
      },
  
    ]
  }
]


@NgModule({
  declarations: [UserManagmentComponent,AddNewUserComponent,AddUserRoleComponent],
  imports: [
    CommonModule,
    ThemeModule,
    NbMenuModule,
    NbCardModule,
    NbTabsetModule,

    Ng2SearchPipeModule,
    NbLayoutModule,
    RouterModule.forChild(routes),
    NbChatModule,
    // CKEditorModule
    PickerModule,
    NbButtonModule,
    NbIconModule,
    NbToastrModule.forRoot(),
    NbWindowModule.forRoot(),
    NbDialogModule,
   NbSelectModule,
ReactiveFormsModule,
    FormsModule,
    AngularPaginatorModule,
  ]
})
export class UserManagmentModule { }
