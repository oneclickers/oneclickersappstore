import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { ThemeModule } from '../@theme/theme.module';
import { NbButtonModule, NbCardModule, NbChatModule, NbDialogModule, NbIconModule, NbInputModule, NbLayoutModule, NbMenuModule, NbSelectModule, NbTabsetModule, NbToastrModule, NbWindowModule } from '@nebular/theme';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SettingModule } from './setting-component/setting.module';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { ChatPartComponent } from './chat-part/chat-part.component';
import { UpdateBasicInfoComponent } from './update-basic-info/update-basic-info.component';
import { CKEditorModule } from 'ng2-ckeditor';
import { DashboardModule } from './dashboard/dashboard.module';
import { PickerModule } from '@ctrl/ngx-emoji-mart';
import { FormsModule } from '@angular/forms';
import { AngularPaginatorModule } from 'angular-paginator';
// import { UserManagmentComponent } from './user-managment/user-managment.component';
import { UiManagerComponent } from './ui-manager/ui-manager.component';
import { EmailComponent } from './email/email.component';
import { AgGridModule } from 'ag-grid-angular';
import { UserManagmentModule } from './user-managment/user-managment.module';
const routes:Routes=[
  {
    path:'',
    component:AdminComponent,
    children:[
      {
        path:'',redirectTo:'Dashboard',pathMatch:'full',
      },
      {
        path:'Dashboard',loadChildren:()=>import('./e-commerce/e-commerce.module').then(LoadModule=>LoadModule.ECommerceModule),
      },
      {
        path:'Message',component:ChatPartComponent,
      },
      {
        path:'BasicInfo',loadChildren:()=>import('./update-basic-info/update-basic-info.module').then(LoadModule=>LoadModule.UpdateBasicInfoModule),
      },
      {
        path:'Setting',loadChildren:()=>import('./setting-component/setting.module').then(LoadModule=>LoadModule.SettingModule)
      },
      {
        path:'Notepad',loadChildren:()=>import('./note-pad/note-pad.module').then(LoadModule=>LoadModule.NotePadModule)
      },
      {
        path:'MenuManager',loadChildren:()=>import('./menu-manager/menu-manager.module').then(LoadModule=>LoadModule.MenuManagerModule)
      },
      {
        path:'User-Management',loadChildren:()=>import('./user-managment/user-managment.module').then(LoadModule=>LoadModule.UserManagmentModule)
      },
      {
        path:'UI-Manager',loadChildren:()=>import('./ui-manager/ui-manager.module').then(LoadModule=>LoadModule.UiManagerModule)
      },
      {
        path:'Email',loadChildren:()=>import('./email/email.module').then(LoadModule=>LoadModule.EmailModule)
      },
      
    ]
  }
]

@NgModule({
  declarations: [
   AdminComponent,
   ChatPartComponent,
      ],
  imports: [
    CommonModule,
    ThemeModule,
    NbMenuModule,
    NbCardModule,
    NbTabsetModule,
    SettingModule,
    Ng2SearchPipeModule,
    NbLayoutModule,
    RouterModule.forChild(routes),
    NbChatModule,
    UserManagmentModule,
    // CKEditorModule
    PickerModule,
    NbButtonModule,
    NbIconModule,
    NbToastrModule.forRoot(),
    NbWindowModule.forRoot(),
    NbDialogModule,
    CKEditorModule,
    DashboardModule,
    FormsModule,
    AngularPaginatorModule,
    NbInputModule,
    NbSelectModule,
    AgGridModule
  ]
})
export class AdminModule { 
  constructor(){
    console.log("adminmodule11");
    
  }
}
