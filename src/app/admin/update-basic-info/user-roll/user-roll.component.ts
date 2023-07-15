import { Component, OnInit } from '@angular/core';
import { NbDialogService, NbToastrService } from '@nebular/theme';
import { NbWindowService } from '@nebular/theme';
import { UserServiceService } from '../../../Service/user-service.service';
import { AddNewRollComponent } from '../../../popup/popup-component/add-new-roll/add-new-roll.component';
import { ConfirmationPopupComponent } from '../../../popup/popup-component/confirmation-popup/confirmation-popup.component';
import { Router } from '@angular/router';

@Component({
  selector: 'ngx-user-roll',
  templateUrl: './user-roll.component.html',
  styleUrls: ['./user-roll.component.scss']
})
export class UserRollComponent implements OnInit {
  public router_Name:any=[]
  public userRoll: any = []
  constructor(
    private userService: UserServiceService,
    private message: NbToastrService,
    private window:NbWindowService,
    private dialog:NbDialogService,
    private router:Router,
  ) {
    this.ngOnInitAPIDatas()
  }

  ngOnInit(): void {
    this.setPageHeader()
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
        CPMessage:`Are You Sure You Want To Delete the ${roll_Name} Roll ?`,
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
  setPageHeader()
  {
    this.router_Name=this.router.url.split('/')
    this.router_Name=this.router_Name.splice(1,3)  
    console.log("menu",this.router_Name);
    
  }
  onKeyUpEvent(event:any){

  }
  AddNewMenu(){

  }
  onChange(data:any){

  }
}
