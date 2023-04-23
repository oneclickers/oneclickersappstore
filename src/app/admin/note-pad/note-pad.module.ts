import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotePadComponent } from './note-pad.component';
import { RouterModule, Routes } from '@angular/router';
import { CreateNoteComponent } from './create-note/create-note.component';
import { NotePadListComponent } from './note-pad-list/note-pad-list.component';
import { NbButtonModule, NbCardModule, NbIconModule } from '@nebular/theme';
import { CKEditorModule } from 'ng2-ckeditor';
import { FormsModule } from '@angular/forms';

const routes:Routes=[
  {
    path:'',component:NotePadComponent,
    children:[
      {
        path:'',redirectTo:'NotepadList',pathMatch:'full'
      },
      {
        path:'NotepadList',component:NotePadListComponent
      },
      {
        path:'CreateNote',component:CreateNoteComponent
      }
    ]
  }
]

@NgModule({
  declarations: [
    NotePadComponent,
    CreateNoteComponent,
    NotePadListComponent,
  ],
  imports: [
    CommonModule,
    NbCardModule,
    NbIconModule,
    FormsModule,
    RouterModule.forChild(routes),
    // CKEditorModule
    CKEditorModule,
    NbButtonModule,
  ]
})
export class NotePadModule {
  
 }
