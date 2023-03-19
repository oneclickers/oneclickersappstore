import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { ThemeModule } from '../@theme/theme.module';
import { NbButtonModule, NbCardModule, NbDialogModule, NbIconModule, NbLayoutModule, NbMenuModule, NbTabsetModule, NbToastrModule, NbWindowModule } from '@nebular/theme';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SettingModule } from './setting-component/setting.module';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { ChatPartComponent } from './chat-part/chat-part.component';
import { NotePadComponent } from './note-pad/note-pad.component';
import { CKEditorModule } from 'ng2-ckeditor';
import { UpdateBasicInfoComponent } from './update-basic-info/update-basic-info.component';
const routes:Routes=[
  {
    path:'',
    component:AdminComponent,
    children:[
      {
        path:'',redirectTo:'Dashboard',pathMatch:'full',
      },
      {
        path:'Dashboard',component:DashboardComponent,
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
      }
    ]
  }
]

@NgModule({
  declarations: [AdminComponent, DashboardComponent, ChatPartComponent, UpdateBasicInfoComponent],
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
    // CKEditorModule
    NbButtonModule,
    NbIconModule,
    NbToastrModule.forRoot(),
    NbWindowModule.forRoot(),
    NbDialogModule
  ]
})
export class AdminModule { 
  constructor(){
    console.log("adminmodule11");
    
  }
}
