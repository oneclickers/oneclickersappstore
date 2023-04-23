import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddNewRollComponent } from './add-new-roll/add-new-roll.component';
import { NbButtonModule, NbCardModule, NbIconModule, NbInputModule, NbToggleModule } from '@nebular/theme';
import { ReactiveFormsModule } from '@angular/forms';
import { ConfirmationPopupComponent } from './confirmation-popup/confirmation-popup.component';
import { AddMenuPopupComponent } from './add-menu-popup/add-menu-popup.component';



@NgModule({
  declarations: [
    AddNewRollComponent,
    ConfirmationPopupComponent,
    AddMenuPopupComponent,
    
  ],
  imports: [
    CommonModule,
    NbButtonModule,
    NbInputModule,
    ReactiveFormsModule,
    NbToggleModule,
    NbCardModule,
    NbIconModule
  ]
})
export class PopupComponentModule { }
