import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UpdateBasicInfoComponent } from './update-basic-info.component';
import { RouterModule, Routes } from '@angular/router';
import { UserRollComponent } from './user-roll/user-roll.component';

import { NbButtonModule, NbCardModule, NbChatModule,  NbDialogModule, NbIconModule, NbLayoutModule, NbMenuModule, NbSelectModule, NbSidebarModule, NbStepperModule, NbTabsetModule, NbToastrModule, NbToggleModule, NbWindowModule } from '@nebular/theme';
import { ThemeModule } from '../../@theme/theme.module';
import { AngularPaginatorModule } from 'angular-paginator';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { PickerModule } from '@ctrl/ngx-emoji-mart';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GenderComponent } from './gender/gender.component';
import { CountryComponent } from './country/country.component';
import { StateComponent } from './state/state.component';
import { DistrictComponent } from './district/district.component';
import { CityComponent } from './city/city.component';
import { BrowserModule } from '@angular/platform-browser';

const routes:Routes=[
  {
    path:'',
    component:UpdateBasicInfoComponent,
    children:[
      {
        path:'',redirectTo:'User-Roll',pathMatch:'full',
      },
      {
        path:'User-Roll',component:UserRollComponent,
      },
      {
        path:'Gender',component:GenderComponent,
      },
      {
        path:'Country',component:CountryComponent,
      },
      {
        path:'State',component:StateComponent,
      },
      {
        path:'District',component:DistrictComponent,
      },
      {
        path:'City',component:CityComponent,
      },
      // {
      //   path:'**',component:MiscellaneousComponent,
      // },
    ]
  }
]

@NgModule({
  declarations: [UpdateBasicInfoComponent,UserRollComponent, GenderComponent, CountryComponent, StateComponent, DistrictComponent, CityComponent],
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
    ReactiveFormsModule,
    // CKEditorModule
    PickerModule,
    NbButtonModule,
    NbIconModule,
    NbToastrModule.forRoot(),
    NbWindowModule.forRoot(),
    NbDialogModule,
   NbSelectModule,

    FormsModule,
    AngularPaginatorModule,
  ]
})
export class UpdateBasicInfoModule { }
