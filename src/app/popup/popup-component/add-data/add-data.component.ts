import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbDialogRef } from '@nebular/theme';

@Component({
  selector: 'ngx-add-data',
  templateUrl: './add-data.component.html',
  styleUrls: ['./add-data.component.scss']
})
export class AddDataComponent implements OnInit {
  addDataFrom: FormGroup;
  uiLst: any[] = [];
  uiBtnLst: any[] = [];
  stateList: any[] = [];
  districtList: any[] = [];
  title: string;
  action: string;
  formGroup: any = {};
  formSubmitted: boolean;
  constructor(
    private fb: FormBuilder,
    protected ref: NbDialogRef<AddDataComponent>,
  ) {
    this.formSubmitted = false
  }
  ngOnInit(): void {
    this.preparForm()
  }
  preparForm() {
    var length: number = 0
    this.uiLst.forEach((ui: any) => {
      length = length + 1
      if (ui.isMandatory) {
        if(ui['formcontrolName']==='stateId'){
          this.stateList=ui.options;
          ui.options=[]
          this.formGroup[ui.formcontrolName] = [null, Validators.required]
        }else if(ui['formcontrolName']==='districtId'){
          this.districtList=ui.options;
          console.log("this.districtList",this.districtList);
          
          ui.options=[]
          this.formGroup[ui.formcontrolName] = [null, Validators.required]
        }
        else{
          this.formGroup[ui.formcontrolName] = [null, Validators.required]
        }
       
      }
      else {
        if(ui['formcontrolName']==='stateId'){
          this.stateList=ui.options;
          ui.options=[]
          this.formGroup[ui.formcontrolName] = [null, Validators.required]
        }else if(ui['formcontrolName']==='districtId'){
          this.districtList=ui.options;
          ui.options=[]
          this.formGroup[ui.formcontrolName] = [null, Validators.required]
        }
        else{
          this.formGroup[ui.formcontrolName] = [null]
        }
      
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
    if (this.addDataFrom.invalid) return;
    else this.ref.close(this.addDataFrom.value)
  }
  onChange(uiname:any){
if(uiname==='countryID'){
  if(this.addDataFrom.controls['countryID'].value!=null&&this.addDataFrom.controls['countryID'].value!=""){
    this.uiLst.forEach((ui:any)=>{
      if(ui['formcontrolName']==='stateId'){
      ui.options=this.stateList.filter((res:any)=>res.countryID===Number(this.addDataFrom.controls['countryID'].value))
      }
    })
  }
}
else if(uiname==='stateId'){
  if(this.addDataFrom.controls['stateId'].value!=null&&this.addDataFrom.controls['stateId'].value!=""){
    this.uiLst.forEach((ui:any)=>{
      if(ui['formcontrolName']==='districtId'){
      ui.options=this.districtList.filter((res:any)=>res.stateId===Number(this.addDataFrom.controls['stateId'].value))
      }
    })
  }
}
}
}
