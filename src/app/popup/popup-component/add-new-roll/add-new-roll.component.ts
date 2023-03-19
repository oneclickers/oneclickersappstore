import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbDialogRef, NbToastrService } from '@nebular/theme';
import { UserServiceService } from '../../../Service/user-service.service';

@Component({
  selector: 'ngx-add-new-roll',
  templateUrl: './add-new-roll.component.html',
  styleUrls: ['./add-new-roll.component.scss'],
 
})
export class AddNewRollComponent implements OnInit {
addNewRollForm:FormGroup
formSubmitted:boolean=false;
@Input() title:any;
@Input() action:any;
@Input() roll:any;
Userroll:any=[]
  constructor(
    private fb:FormBuilder,
    private userService:UserServiceService,
    private message:NbToastrService,
    protected ref: NbDialogRef<AddNewRollComponent>,
  ) {}

  ngOnInit(): void {
    this.action=='Add'?this.ngAddPrepareFrom():this.ngEditPrepareFrom(this.roll);
  }

 ngAddPrepareFrom(){
  console.log("ngAddPrepareFrom",this.roll);
  this.addNewRollForm=this.fb.group({
    roll_Name:[null,Validators.required],
    description:[null,Validators.required],
    created_Date:[null],
    updated_Date:[null],
    is_Active:[true]

  })
}
ngEditPrepareFrom(roll:any){
  this.addNewRollForm=this.fb.group({
    roll_Id:[roll.roll_Id,Validators.required],
    roll_Name:[roll.roll_Name,Validators.required],
    description:[roll?.description,Validators.required],
    created_Date:[roll?.created_Date],
    updated_Date:[roll?.updated_Date],
    is_Active:[roll?.is_Active==1?true:false]

  })
  
}
get formStatus(){
  return this.addNewRollForm.controls
}
toggle(toggle:any){
  console.log("toggle",toggle);
  
this.addNewRollForm.controls['is_Active'].setValue(toggle)
}
close(){
  this.ref.close(false)
}
onSubmit(){
this.formSubmitted=true;
if(this.addNewRollForm.invalid) return;
else{
  if(this.action=="Add"){
    var created_Date:any=new Date();
    this.addNewRollForm.controls['created_Date'].setValue(`${created_Date.getDate()}-${created_Date.getMonth()+1}-${created_Date.getFullYear()}`);
    this.addNewRollForm.controls['updated_Date'].setValue(`${created_Date.getDate()}-${created_Date.getMonth()+1}-${created_Date.getFullYear()}`);
    this.userService.postUserRoll(this.addNewRollForm.value).subscribe((res:any)=>{
      if(res.statuscode===200){
        this.message.success('Success',res.message,{
          status:'success'
        })
      }
      else{
        this.message.success('Info',res.message,{
          status:'info'
        })
      }
        });
  }else{
    var created_Date:any=new Date();
    this.addNewRollForm.controls['updated_Date'].setValue(`${created_Date.getDate()}-${created_Date.getMonth()+1}-${created_Date.getFullYear()}`);
    this.userService.putUserRoll(this.addNewRollForm.value).subscribe((res:any)=>{
      if(res.statuscode===200){
        this.message.success('Success',res.message,{
          status:'success'
        })
      }
      else{
        this.message.success('Info',res.message,{
          status:'info'
        })
      }
        });
  }

  this.ref.close(false)
}
}
}
