/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule ,HTTP_INTERCEPTORS} from '@angular/common/http';
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
  NbStepperModule,
  NbToastrModule,
  NbToggleModule,
  NbWindowModule,
} from '@nebular/theme';
import { AdminModule } from './admin/admin.module';
import { TutorModule } from './tutor/tutor.module';
import { StudentModule } from './student/student.module';
import { ProfileSettingComponent } from './shard-Component/profile-setting/profile-setting.component';
import { AppearanceSettingComponent } from './shard-Component/appearance-setting/appearance-setting.component';
import { LanguageSettingComponent } from './shard-Component/language-setting/language-setting.component';
import { NotePadModule } from './admin/note-pad/note-pad.module';
import { ApiHandlerInterceptor } from './Service/interceptors/api-handler.interceptor';
import { PopupComponentComponent } from './popup/popup-component/popup-component.component';
import { PopupComponentModule } from './popup/popup-component/popup-component.module';
import { CreateAccountComponent } from './create-account/create-account.component';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { environment } from '../environments/environment';
import { CKEditorModule } from 'ckeditor4-angular';
import { PickerModule } from '@ctrl/ngx-emoji-mart';
const config: SocketIoConfig = {
   url: environment.messageURL,
   options: {} ,
   
  };

@NgModule({
  declarations: [AppComponent, PopupComponentComponent],
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
    NbToggleModule,
    CoreModule.forRoot(),
    ThemeModule.forRoot(),
    AdminModule,
    TutorModule,
    StudentModule,
    NotePadModule,
    PopupComponentModule,
    NbStepperModule,
    SocketIoModule.forRoot(config),
    CKEditorModule,
    PickerModule
  ],
  providers:[ {
    provide: HTTP_INTERCEPTORS,
    useClass: ApiHandlerInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent],
})
export class AppModule {
}
