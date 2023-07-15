import { Component, OnInit } from '@angular/core';
import { NbDialogService, NbToastrService } from '@nebular/theme';
import { NbWindowService } from '@nebular/theme';
// import { UserServiceService } from '../../../Service/user-service.service';
// import { AddNewRollComponent } from '../../../popup/popup-component/add-new-roll/add-new-roll.component';
// import { ConfirmationPopupComponent } from '../../../popup/popup-component/confirmation-popup/confirmation-popup.component';
import { Router } from '@angular/router';
import { UserServiceService } from '../../../Service/user-service.service';
import { InputTypeService } from '../../../Service/input-type.service';
import { Observable, forkJoin } from 'rxjs';
import { UiServiceService } from '../../../Service/ui-service.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HostServiceService } from '../../../Service/host-service.service';
@Component({
  selector: 'ngx-create-ui',
  templateUrl: './create-ui.component.html',
  styleUrls: ['./create-ui.component.scss']
})
export class CreateUiComponent implements OnInit {
  public router_Name:any=[];
  booleanValues:any=[];
  formSubmitted=true;
  public inputTypeList:any=[];
  public inputDataTypeList:any=[];
  Uiform:FormGroup;
  fb:FormBuilder;
  submited
  constructor(
    private userService: UserServiceService,
    private message: NbToastrService,
    private window:NbWindowService,
    private dialog:NbDialogService,
    private router:Router,
    private inputTypeService:InputTypeService,
    private uiService:UiServiceService,
    private hostservice: HostServiceService,
  ) { }

  ngOnInit(): void {
    this.setPageHeader()
    this.booleanValues=[
      {
        value:true,
        description:true
      },
      {
        value:false,
        description:false
      }
    ]
    this.getInitData();
  }
  prepareform(){
    this.Uiform=this.fb.group({
    label:[null],
    FielType:[null],
    FielDateType:[null],
    formcotrolname:[null],
    mandatory:[null],
    width:[null],
    sort:[null],
    Visible:[null],
    createdBy:[null],
    title:[null],
    uicode:[null],
    })
  }
  get formStatus(){
    return this.Uiform.controls
  }
  setPageHeader()
  {
    this.router_Name=this.router.url.split('/')
    this.router_Name=this.router_Name.splice(1,3)  
    console.log("menu",this.router_Name);
    
  }
  AddNewMenu(){
    
  }
  onSubmit(){
this.formSubmitted=true;
var formdata:any=this.Uiform.value;
formdata.createdBy=this.hostservice.getUserId()
if(this.Uiform.invalid){
  this.message.show("Please Fill All Field",'ERROR',{
    status:'danger'
  });
  return
}
else{
  this.uiService.addUIList(formdata)
}

  }
  onKeyUpEvent(event:any){

  }
  onChange(data:any){

  }
  getInitData(){
    const observable:Observable<any>[]=[];
    observable.push(this.inputTypeService.getInputType());
    observable.push(this.inputTypeService.getInputDataType());
    forkJoin(observable).subscribe((resAry:any)=>{
      resAry.forEach((res:any,index:number) => {
        if(res.statuscode===200&&index===0){
          this.inputTypeList=res.data;
          console.log("this.inputTypeList",this.inputTypeList);
          }
         else if(res.statuscode===200&&index===1){
          this.inputDataTypeList=res.data;
          console.log("this.inputTypeList",this.inputTypeList);
            }
            else if(res.statuscode===300){
              this.message.show(res.message,'Info',{
                status:'info'
              })
            }
            else{
              this.message.show(res.message,'ERROR',{
                status:'danger'
              })
            }
      });
    },(error:any)=>{
      this.message.show(error.message,'ERROR',{
        status:'danger'
      })
    })
  }
}
