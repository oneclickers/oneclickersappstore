import { Component, OnInit } from '@angular/core';
import { NbDialogService, NbToastrService } from '@nebular/theme';
import { NbWindowService } from '@nebular/theme';
// import { UserServiceService } from '../../../Service/user-service.service';
// import { AddNewRollComponent } from '../../../popup/popup-component/add-new-roll/add-new-roll.component';
// import { ConfirmationPopupComponent } from '../../../popup/popup-component/confirmation-popup/confirmation-popup.component';
import { Router } from '@angular/router';
import { UserServiceService } from '../../Service/user-service.service';

@Component({
  selector: 'ngx-ui-manager',
  templateUrl: './ui-manager.component.html',
  styleUrls: ['./ui-manager.component.scss']
})
export class UiManagerComponent implements OnInit {
  public router_Name:any=[];
  booleanValues:any=[]
  constructor(
    private userService: UserServiceService,
    private message: NbToastrService,
    private window:NbWindowService,
    private dialog:NbDialogService,
    private router:Router,

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
  }
  setPageHeader()
  {
    this.router_Name=this.router.url.split('/')
    this.router_Name=this.router_Name.splice(1,2)  
    console.log("menu",this.router_Name);
    
  }
  AddNewMenu(){

  }
  onKeyUpEvent(event:any){

  }
  onChange(data:any){

  }
}
