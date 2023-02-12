import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule, Routes } from '@angular/router';

import { AdminComponent } from './admin.component';
import { ThemeModule } from '../@theme/theme.module';
import { NbCardModule, NbMenuModule, NbTabsetModule } from '@nebular/theme';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SettingComponentComponent } from './setting-component/setting-component.component';
import { LanguageSettingComponent } from './setting-component/language-setting/language-setting.component';
import { AppearanceSettingComponent } from './setting-component/appearance-setting/appearance-setting.component';
import { ProfileSettingComponent } from './setting-component/profile-setting/profile-setting.component';
import { NotificationSettingComponent } from './setting-component/notification-setting/notification-setting.component';
import { SettingModule } from './setting-component/setting.module';

const routes:Routes=[
  {
    path:'',
    component:AdminComponent,
    children:[
      {
        path:'',redirectTo:'Dashboard',pathMatch:'full'
      },
      {
        path:'Dashboard',component:DashboardComponent
      },
      {
        path:'Setting',loadChildren:()=>import('./setting-component/setting.module').then(LoadModule=>LoadModule.SettingModule)
      }
    ]
  }
]

@NgModule({
  declarations: [AdminComponent, DashboardComponent],
  imports: [
    CommonModule,
    ThemeModule,
    NbMenuModule,
    NbCardModule,
    NbTabsetModule,
    SettingModule,
    RouterModule.forChild(routes)
  ]
})
export class AdminModule { }
