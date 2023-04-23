import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NbDialogService, NbMenuService, NbToastrService, NbWindowService } from '@nebular/theme';
import { AddNewRollComponent } from '../../../popup/popup-component/add-new-roll/add-new-roll.component';
import { ConfirmationPopupComponent } from '../../../popup/popup-component/confirmation-popup/confirmation-popup.component';
import { MenuServiceService } from '../../../Service/menu-service.service';
import { UserServiceService } from '../../../Service/user-service.service';
import { HostServiceService } from '../../../Service/host-service.service';

@Component({
  selector: 'ngx-menu-list',
  templateUrl: './menu-list.component.html',
  styleUrls: ['./menu-list.component.scss']
})
export class MenuListComponent implements OnInit {
  public menuList: any = []
 
  constructor(
    private userService: UserServiceService,
    private message: NbToastrService,
    private window:NbWindowService,
    private dialog:NbDialogService,
    private menuService:MenuServiceService,
    private router:Router,
    private hostService:HostServiceService
  ) {
    this.ngOnInitAPIDatas()
  }

  ngOnInit(): void {
  }
  ngOnInitAPIDatas() {
    this.menuService.getMenus().subscribe((res: any) => {
      console.log("getMenus", res);
      if (res.statuscode == 200) {
        this.menuList = res.data
        console.log("userroll",  this.menuList);

      }
      else {
        this.message.info('Info', res.message, {
          status: 'info'
        })
      }
    })
  }
  AddNewMenu(){
   this.router.navigate(['/Admin/MenuManager/AddNewMenu'])
  }
  editExistsMenu(menuId:any){
  this.router.navigate(['/Admin/MenuManager/EditMenu',menuId])
  }
  deleteMenu(menu_Id:number,menu_Name){
    this.dialog.open(ConfirmationPopupComponent,{
      context: {
        title: 'Confirmation Popup',
        CPMessage:`Are You Sure You Want Delete the ${menu_Name} Menu ?`,
        id:menu_Id,
       
      },
  }).onClose.subscribe((res:any)=>{
if(res.action===true){
  this.menuService.deleteMenu(res.id).subscribe((res:any)=>{
    if(res.statuscode===200){
      this.hostService.autoSetMenu()
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
checkParent(data:any){

  console.log("test",data);
  
  return data===null?"Parent":this.menuList[this.menuList.findIndex((res:any)=>res.id===data)]['title']
}
menu_Id
}
