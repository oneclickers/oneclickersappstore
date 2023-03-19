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
@Input() roll_Id:any
@Input() CPMessage:any
  constructor(
    private dialog:NbDialogRef<ConfirmationPopupComponent>,
    private userService:UserServiceService,
    private message:NbToastrService
  ) { }

  ngOnInit(): void {
  }
  close(){
    this.dialog.close()
  }
  OnSubmit(){
    console.log("datelet",this.roll_Id);
    
    this.userService.deleteUserRoll(this.roll_Id).subscribe((res:any)=>{
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
    this.dialog.close()
  }
}
