import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingComponentComponent } from './setting-component.component';
import { AppearanceSettingComponent } from './appearance-setting/appearance-setting.component';
import { LanguageSettingComponent } from './language-setting/language-setting.component';
import { NotificationSettingComponent } from './notification-setting/notification-setting.component';
import { ProfileSettingComponent } from './profile-setting/profile-setting.component';
import { RouterModule, Routes } from '@angular/router';
import { NbButtonModule, NbCardModule, NbCheckboxModule, NbIconModule, NbInputModule, NbMenuModule, NbTabsetModule, NbToggleModule } from '@nebular/theme';
import { ThemeModule } from '../../@theme/theme.module';

const routes:Routes=[
  {
    path:'',component:SettingComponentComponent,
    children:[
      {
        path:'',redirectTo:'Profile-Setting',pathMatch:'full'
      },
      {
        path:'Profile-Setting',component:ProfileSettingComponent
      },
      {
        path:'Appearance-Setting',component:AppearanceSettingComponent
      },
      {
        path:'Language-Setting',component:LanguageSettingComponent
      },
      {
        path:'Notification-Setting',component:NotificationSettingComponent
      }
    ]
  }
]

@NgModule({
  declarations: [
    SettingComponentComponent,
    AppearanceSettingComponent,
    LanguageSettingComponent,
    NotificationSettingComponent,
    ProfileSettingComponent,

  ],
  imports: [
    CommonModule,
    NbMenuModule,
    NbCardModule,
    NbTabsetModule,
    ThemeModule,
    NbButtonModule,
    NbIconModule,
    NbInputModule,
    NbCheckboxModule,
    RouterModule.forChild(routes),
    NbToggleModule,
  ]
})
export class SettingModule { }
