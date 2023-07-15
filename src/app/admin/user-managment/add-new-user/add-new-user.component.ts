import { Component, OnInit } from '@angular/core';
import { NbDialogService, NbToastrService } from '@nebular/theme';
import { NbWindowService } from '@nebular/theme';
import { Router } from '@angular/router';
import { UserServiceService } from '../../../Service/user-service.service';
import { ConfirmationPopupComponent } from '../../../popup/popup-component/confirmation-popup/confirmation-popup.component';
import { AddUserComponent } from '../../../popup/popup-component/add-user/add-user.component';
import { FormBuilder, FormGroup } from '@angular/forms';


@Component({
  selector: 'ngx-add-new-user',
  templateUrl: './add-new-user.component.html',
  styleUrls: ['./add-new-user.component.scss']
})
export class AddNewUserComponent implements OnInit {

  public router_Name:any=[]
  public userRoll: any = [];
  userForm:FormGroup;
  agPaginatorConfig:any
  search:any;
  maxSize:any
  constructor(
    private userService: UserServiceService,
    private message: NbToastrService,
    private window:NbWindowService,
    private dialog:NbDialogService,
    private router:Router,
    private fb:FormBuilder
  ) {
    this.ngOnInitAPIDatas()
  }

  ngOnInit(): void {
    this.setPageHeader();
    this.agPaginatorConfig={
      id: 'ANGULAR_PAGINATOR_DEFAULT',
      itemsPerPage: this.maxSize,
      currentPage: 1
    }
    this.ngPreparForm();
  }
  ngOnInitAPIDatas() {
    this.userService.getUsers().subscribe((res: any) => {
      console.log("user", res);
      if (res.statuscode == 200) {
        this.userRoll = res.data
        // console.log("userroll", this.userRoll);

      }
      else {
        this.message.info('Info', res.message, {
          status: 'info'
        })
      }
    })
  }
  ngPreparForm(){
    this.userForm = this.fb.group({
      search:[null],
    })
  }
  addNewUser(){
  this.dialog.open(AddUserComponent,{
    // context: {
    //   title: 'Add New User',
    //   action:'Add',
    // },
})
  }
  editExistsRoll(roll:any){
  //   this.dialog.open(AddNewRollComponent,{
  //     context: {
  //       title: 'Edit Exists Roll',
  //       action:'Edit',
  //       roll:roll,
  //     },
  // }).onClose.subscribe((res:any)=>{
  //   this.ngOnInitAPIDatas()
  // })
  }
  deleteRoll(roll_Id:number,roll_Name:any){
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
    this.router_Name=this.router_Name.splice(1,2)  
    console.log("menu",this.router_Name);
    
  }
  onKeyUpEvent(event:any){
    this.search=this.userForm.controls['search'].value;
  }
  AddNewMenu(){

  }
  onChange(data:any){

  }
  currentPage(event:any){
    this.agPaginatorConfig={
      id: 'ANGULAR_PAGINATOR_DEFAULT',
      itemsPerPage: this.maxSize,
      currentPage: event
    }

}

}
