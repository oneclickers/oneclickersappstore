import { Component, Input, OnInit } from '@angular/core';
import { NbDialogRef, NbToastrService } from '@nebular/theme';
import { UserServiceService } from '../../../Service/user-service.service';

@Component({
  selector: 'ngx-confirmation-popup',
  templateUrl: './confirmation-popup.component.html',
  styleUrls: ['./confirmation-popup.component.scss']
})
export class ConfirmationPopupComponent implements OnInit {
@Input() title:any;
@Input() id:any
@Input() CPMessage:any
  constructor(
    private dialog:NbDialogRef<ConfirmationPopupComponent>,
    private userService:UserServiceService,
    private message:NbToastrService
  ) { }

  ngOnInit(): void {
  }
  close(){
    var data:any={
      action:false,
   
    }
    this.dialog.close(data)
  }
  OnSubmit(){
    console.log("datelet",this.id);
    
    this.userService.deleteUserRoll(this.id).subscribe((res:any)=>{
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
    })
    var data:any={
      action:true,
      id:this.id
    }
    this.dialog.close(data)
  }
}
