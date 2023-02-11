import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule, Routes } from '@angular/router';

import { AdminComponent } from './admin.component';
import { ThemeModule } from '../@theme/theme.module';
import { NbCardModule, NbMenuModule } from '@nebular/theme';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SettingComponentComponent } from './setting-component/setting-component.component';

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
        path:'Setting',component:SettingComponentComponent
      }
    ]
  }
]

@NgModule({
  declarations: [AdminComponent, DashboardComponent, SettingComponentComponent],
  imports: [
    CommonModule,
    ThemeModule,
    NbMenuModule,
  NbCardModule,
    RouterModule.forChild(routes)
  ]
})
export class AdminModule { }
