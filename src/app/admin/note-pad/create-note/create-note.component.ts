import { Component, OnInit, ViewChild } from '@angular/core';
import { CKEditorComponent } from 'ng2-ckeditor';

@Component({
  selector: 'ngx-create-note',
  templateUrl: './create-note.component.html',
  styleUrls: ['./create-note.component.scss']
})
export class CreateNoteComponent implements OnInit {
  ngOnInit() {
    // throw new Error('Method not implemented.');
  }
  constructor(){

  }
  name = 'Angular 4';
  config = {
   uiColor: '#ffffff',
   toolbarGroups: [{ name: 'clipboard', groups: ['clipboard', 'undo'] },
   { name: 'editing', groups: ['find', 'selection', 'spellchecker'] },
   { name: 'links' }, { name: 'insert' },
   { name: 'document', groups: ['mode', 'document', 'doctools'] },
   { name: 'basicstyles', groups: ['basicstyles', 'cleanup'] },
   { name: 'paragraph', groups: ['list', 'indent', 'blocks', 'align'] },
   { name: 'styles' },
   { name: 'colors' }],
   skin: 'kama',
   resize_enabled: false,
   removePlugins: 'elementspath,save,magicline',
   extraPlugins: 'divarea,smiley,justify,indentblock,colordialog',
   colorButton_foreStyle: {
      element: 'font',
      attributes: { 'color': '#(color)' }
   },
   height: '61vh',
   overflow:'hidden',
   removeDialogTabs: 'image:advanced;link:advanced',
   removeButtons: 'Subscript,Superscript,Anchor,Source,Table',
   format_tags: 'p;h1;h2;h3;pre;div'
}
}
