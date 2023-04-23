import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { ThemeModule } from '../@theme/theme.module';
import { NbButtonModule, NbCardModule, NbChatModule, NbDialogModule, NbIconModule, NbLayoutModule, NbMenuModule, NbTabsetModule, NbToastrModule, NbWindowModule } from '@nebular/theme';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SettingModule } from './setting-component/setting.module';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { ChatPartComponent } from './chat-part/chat-part.component';
import { UpdateBasicInfoComponent } from './update-basic-info/update-basic-info.component';
import { CKEditorModule } from 'ng2-ckeditor';
import { DashboardModule } from './dashboard/dashboard.module';
import { PickerModule } from '@ctrl/ngx-emoji-mart';
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
        path:'BasicInfo',component:UpdateBasicInfoComponent,
      },
      {
        path:'Setting',loadChildren:()=>import('./setting-component/setting.module').then(LoadModule=>LoadModule.SettingModule)
      },
      {
        path:'Notepad',loadChildren:()=>import('./note-pad/note-pad.module').then(LoadModule=>LoadModule.NotePadModule)
      },
      {
        path:'MenuManager',loadChildren:()=>import('./menu-manager/menu-manager.module').then(LoadModule=>LoadModule.MenuManagerModule)
      }
      
    ]
  }
]

@NgModule({
  declarations: [
   AdminComponent,
   ChatPartComponent,
   UpdateBasicInfoComponent,
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
    // CKEditorModule
    PickerModule,
    NbButtonModule,
    NbIconModule,
    NbToastrModule.forRoot(),
    NbWindowModule.forRoot(),
    NbDialogModule,
    CKEditorModule,
    DashboardModule
  ]
})
export class AdminModule { 
  constructor(){
    console.log("adminmodule11");
    
  }
}
