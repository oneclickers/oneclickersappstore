import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddNewRollComponent } from './add-new-roll/add-new-roll.component';
import { NbButtonModule, NbCardModule, NbIconModule, NbInputModule, NbListModule, NbProgressBarModule, NbSelectModule, NbToggleModule } from '@nebular/theme';
import { ReactiveFormsModule } from '@angular/forms';
import { ConfirmationPopupComponent } from './confirmation-popup/confirmation-popup.component';
import { AddMenuPopupComponent } from './add-menu-popup/add-menu-popup.component';
import { AddUserComponent } from './add-user/add-user.component';
import { AddDataComponent } from './add-data/add-data.component';
import { EditDataComponent } from './edit-data/edit-data.component';



@NgModule({
  declarations: [
    AddNewRollComponent,
    ConfirmationPopupComponent,
    AddMenuPopupComponent,
    AddUserComponent,
    AddDataComponent,
    EditDataComponent,
    
  ],
  imports: [
    CommonModule,
    NbButtonModule,
    NbInputModule,
    ReactiveFormsModule,
    NbToggleModule,
    NbCardModule,
    NbIconModule,
    NbProgressBarModule,
    NbListModule,
    NbSelectModule,
  ]
})
export class PopupComponentModule { }
