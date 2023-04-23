import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbWindowRef } from '@nebular/theme';

@Component({
  selector: 'ngx-add-menu-popup',
  templateUrl: './add-menu-popup.component.html',
  styleUrls: ['./add-menu-popup.component.scss']
})
export class AddMenuPopupComponent implements OnInit {
  addNewMenuForm:FormGroup;
  formSubmitted:boolean=false;
  menuType: any;
  constructor(
    private fb:FormBuilder,
    protected window:NbWindowRef<AddMenuPopupComponent>
  ) { }

  ngOnInit(): void {
    this.ngAddMenuPrepareFrom()
  }
  ngAddMenuPrepareFrom(){
    this.addNewMenuForm=this.fb.group({
      title:[null,Validators.required],
    })
  }
  get formStatus(){
    return this.addNewMenuForm.controls
  }
  onSubmit(){
    this.formSubmitted=true;
    if(this.addNewMenuForm.invalid){
    return
    }
    else{
      var data:any={
        menuType:this.menuType,
        title:this.addNewMenuForm.controls['title'].value
      }
      this.window.close(data)
    }
  }
}
