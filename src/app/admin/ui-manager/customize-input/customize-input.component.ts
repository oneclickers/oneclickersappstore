import { Component, OnInit } from '@angular/core';
import { NbDialogService, NbToastrService } from '@nebular/theme';
import { NbWindowService } from '@nebular/theme';
// import { UserServiceService } from '../../../Service/user-service.service';
// import { AddNewRollComponent } from '../../../popup/popup-component/add-new-roll/add-new-roll.component';
// import { ConfirmationPopupComponent } from '../../../popup/popup-component/confirmation-popup/confirmation-popup.component';
import { Router } from '@angular/router';
import { UserServiceService } from '../../../Service/user-service.service';
import { Observable } from 'rxjs-compat';
import { InputTypeService } from '../../../Service/input-type.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'ngx-customize-input',
  templateUrl: './customize-input.component.html',
  styleUrls: ['./customize-input.component.scss']
})
export class CustomizeInputComponent implements OnInit {
  public router_Name:any=[];
  public inputTypeList:any=[];
  public inputDataTypeList:any=[];
  constructor(    private userService: UserServiceService,
    private message: NbToastrService,
    private window:NbWindowService,
    private dialog:NbDialogService,
    private router:Router,
    private inputTypeService:InputTypeService
    ) { }

  ngOnInit(): void {
    this.setPageHeader();
    this.getInitData()
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
  setPageHeader()
  {
    this.router_Name=this.router.url.split('/')
    this.router_Name=this.router_Name.splice(1,3)  
    console.log("menu",this.router_Name);
    
  }
  editExistsRoll(data:any){

  }
  deleteRoll(data:any,values:any){

  }
  onKeyUpEvent(data:any){

  }
  Add(){

  }
}
