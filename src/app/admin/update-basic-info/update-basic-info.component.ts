import { Component, OnInit } from '@angular/core';
import { NbDialogService, NbToastrService } from '@nebular/theme';
import { UserServiceService } from '../../Service/user-service.service';
import { NbWindowService } from '@nebular/theme';
import { AddNewRollComponent } from '../../popup/popup-component/add-new-roll/add-new-roll.component';
import { ConfirmationPopupComponent } from '../../popup/popup-component/confirmation-popup/confirmation-popup.component';

@Component({
  selector: 'ngx-update-basic-info',
  templateUrl: './update-basic-info.component.html',
  styleUrls: ['./update-basic-info.component.scss']
})
export class UpdateBasicInfoComponent implements OnInit {
  public userRoll: any = []
  constructor(
    private userService: UserServiceService,
    private message: NbToastrService,
    private window:NbWindowService,
    private dialog:NbDialogService
  ) {
    this.ngOnInitAPIDatas()
  }

  ngOnInit(): void {
  }
  ngOnInitAPIDatas() {
    this.userService.getUserRoll().subscribe((res: any) => {
      console.log("userRoll", res);
      if (res.statuscode == 200) {
        this.userRoll = res.data
        console.log("userroll", this.userRoll);

      }
      else {
        this.message.info('Info', res.message, {
          status: 'info'
        })
      }
    })
  }
  addNewRoll(){
  this.dialog.open(AddNewRollComponent,{
    context: {
      title: 'Add New Roll',
      action:'Add',
    },
})
  }
  editExistsRoll(roll:any){
    this.dialog.open(AddNewRollComponent,{
      context: {
        title: 'Edit Exists Roll',
        action:'Edit',
        roll:roll,
      },
  }).onClose.subscribe((res:any)=>{
    this.ngOnInitAPIDatas()
  })
  }
  deleteRoll(roll_Id:number,roll_Name){
    this.dialog.open(ConfirmationPopupComponent,{
      context: {
        title: 'Confirmation Popup',
        CPMessage:`Are You Sure You Want Delete the ${roll_Name} Roll ?`,
        id:roll_Id,
       
      },
  }).onClose.subscribe((res:any)=>{
    if(res.action===true){
      this.userService.deleteUserRoll(res.id).subscribe((res:any)=>{
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
    }
    this.ngOnInitAPIDatas()
  })
  }
}
