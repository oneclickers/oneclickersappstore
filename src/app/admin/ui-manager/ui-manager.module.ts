import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UiManagerComponent } from './ui-manager.component';
import { Router, RouterModule, RouterOutlet, Routes } from '@angular/router';
import { UiListComponent } from './ui-list/ui-list.component';
import { CreateUiComponent } from './create-ui/create-ui.component';
import { CustomizeInputComponent } from './customize-input/customize-input.component';
import { NbButtonModule, NbCardModule, NbIconModule, NbInputModule, NbSelectModule, NbTabsetModule, NbToastrModule } from '@nebular/theme';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';


const routes:Routes=[
  {
    path:'',component:UiManagerComponent,
    children:[
      {
        path:'',redirectTo:'UI-List',pathMatch:'full'
      },
      {
        path:'UI-List',component:UiListComponent
      },
      {
        path:'Create-UI',component:CreateUiComponent
      },
      {
        path:'Customize-Input',component:CustomizeInputComponent
      }
    ]
  }
]


@NgModule({
  declarations: [UiManagerComponent,CreateUiComponent,UiListComponent,CustomizeInputComponent],
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    RouterModule.forChild(routes),
    NbInputModule,
    NbButtonModule,
    NbSelectModule,
    NbToastrModule,
    NbCardModule,
    NbIconModule,
    NbTabsetModule,
  ]
})
export class UiManagerModule { }
