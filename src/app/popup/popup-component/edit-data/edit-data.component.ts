import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbDialogRef } from '@nebular/theme';

@Component({
  selector: 'ngx-edit-data',
  templateUrl: './edit-data.component.html',
  styleUrls: ['./edit-data.component.scss']
})
export class EditDataComponent implements OnInit {

  addDataFrom: FormGroup;
  uiLst: any[] = [];
  uiBtnLst: any[] = [];
  uiAnswer:any[]=[];
  title: string;
  action: string;
  formGroup: any = {};
  formSubmitted: boolean;
  constructor(
    private fb: FormBuilder,
    protected ref: NbDialogRef<EditDataComponent>,
  ) {
    this.formSubmitted = false
  }
  ngOnInit(): void {
    this.preparForm();
    console.log("uiAnswer",this.uiAnswer);
    
  }
  preparForm() {
    var length: number = 0
    this.uiLst.forEach((ui: any) => {
      length = length + 1
      if (ui.isMandatory) {
        this.formGroup[ui.formcontrolName] = [this.uiAnswer[0][ui.formcontrolName], Validators.required]
      }
      else {
        this.formGroup[ui.formcontrolName] = [this.uiAnswer[0][ui.formcontrolName]]
      }
    });
    if (length === this.uiLst.length) {
      this.addDataFrom = this.fb.group(this.formGroup)
    }
  }
  get formStatus() {
    return this.addDataFrom.controls;
  }
  close() {
    this.ref.close(false)
  }
  onSubmit() {
    this.formSubmitted = true;
    var data:any=this.addDataFrom.value;
    data['id']=this.uiAnswer[0]['id'];
    if (this.addDataFrom.invalid){ return;}
    else{ this.ref.close(data)}
  }

}
