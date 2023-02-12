/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CoreModule } from './@core/core.module';
import { ThemeModule } from './@theme/theme.module';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import {
  NbChatModule,
  NbDatepickerModule,
  NbDialogModule,
  NbMenuModule,
  NbSidebarModule,
  NbToastrModule,
  NbWindowModule,
} from '@nebular/theme';
import { AdminModule } from './admin/admin.module';
import { TutorModule } from './tutor/tutor.module';
import { StudentModule } from './student/student.module';
import { ProfileSettingComponent } from './shard-Component/profile-setting/profile-setting.component';
import { AppearanceSettingComponent } from './shard-Component/appearance-setting/appearance-setting.component';
import { LanguageSettingComponent } from './shard-Component/language-setting/language-setting.component';

@NgModule({
  declarations: [AppComponent, ProfileSettingComponent, AppearanceSettingComponent, LanguageSettingComponent,],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    NbSidebarModule.forRoot(),
    NbMenuModule.forRoot(),
    NbDatepickerModule.forRoot(),
    NbDialogModule.forRoot(),
    NbWindowModule.forRoot(),
    NbToastrModule.forRoot(),
    NbChatModule.forRoot({
      messageGoogleMapKey: 'AIzaSyA_wNuCzia92MAmdLRzmqitRGvCF7wCZPY',
    }),
    CoreModule.forRoot(),
    ThemeModule.forRoot(),
    AdminModule,
    TutorModule,
    StudentModule
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
}
