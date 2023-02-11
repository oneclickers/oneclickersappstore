import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentComponent } from './student.component';
import { RouterModule, Routes } from '@angular/router';
import { ThemeModule } from '../@theme/theme.module';
import { NbMenuModule } from '@nebular/theme';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SettingComponentComponent } from './setting-component/setting-component.component';

const routes:Routes=[
  {
    path:'',
    component:StudentComponent,
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
  declarations: [StudentComponent, DashboardComponent, SettingComponentComponent],
  imports: [
    CommonModule,
    ThemeModule,
    NbMenuModule,
  
    RouterModule.forChild(routes)
  ]
})
export class StudentModule { }
