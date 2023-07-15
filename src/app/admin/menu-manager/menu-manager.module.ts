import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuManagerComponent } from './menu-manager.component';
import { RouterModule, Routes } from '@angular/router';
import { MenuListComponent } from './menu-list/menu-list.component';
import { AddNewMenuComponent } from './add-new-menu/add-new-menu.component';
import { NbAccordionModule, NbButtonGroupModule, NbButtonModule, NbCardModule, NbDialogModule, NbIconModule, NbInputModule, NbLayoutModule, NbMenuModule, NbSelectModule, NbTabsetModule, NbToastrModule, NbWindowModule } from '@nebular/theme';
import { ThemeModule } from '../../@theme/theme.module';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { ReactiveFormsModule } from '@angular/forms';
import { EditMenuComponent } from './edit-menu/edit-menu.component';
import { AngularPaginatorModule } from 'angular-paginator';
// import { Ng2SearchPipeModule } from 'ng2-search-filter';
const routes:Routes=[
  {
    path:'',component:MenuManagerComponent
    ,children:[
      {path:'',pathMatch:'full',redirectTo:'MenuList'},
      {path:'MenuList',component:MenuListComponent},
      {path:'AddNewMenu',component:AddNewMenuComponent},
      {path:'EditMenu/:id',component:EditMenuComponent}
      
    ]
  }
]

@NgModule({
  declarations: [
    MenuManagerComponent,
    MenuListComponent,
    AddNewMenuComponent,
    EditMenuComponent,
    
  ],
  imports: [
    CommonModule,
    NbCardModule,
    ThemeModule,
    NbMenuModule,
    NbCardModule,
    NbTabsetModule,
    Ng2SearchPipeModule,
    NbLayoutModule,
    NbIconModule,
    NbButtonModule,
    NbSelectModule,
    NbAccordionModule,
    ReactiveFormsModule,// NbButtonGroupModule,
    RouterModule.forChild(routes),
    NbToastrModule.forRoot(),
    NbWindowModule.forRoot(),
    NbDialogModule,
    AngularPaginatorModule,
    NbInputModule,
  ]
})
export class MenuManagerModule { }
