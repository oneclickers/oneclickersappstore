import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NbDialogService, NbMenuService, NbToastrService, NbWindowService } from '@nebular/theme';
import { AddNewRollComponent } from '../../../popup/popup-component/add-new-roll/add-new-roll.component';
import { ConfirmationPopupComponent } from '../../../popup/popup-component/confirmation-popup/confirmation-popup.component';
import { MenuServiceService } from '../../../Service/menu-service.service';
import { UserServiceService } from '../../../Service/user-service.service';
import { HostServiceService } from '../../../Service/host-service.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'ngx-menu-list',
  templateUrl: './menu-list.component.html',
  styleUrls: ['./menu-list.component.scss']
})
export class MenuListComponent implements OnInit {
  public menuList: any = [];
  public router_Name:any=[]
  agPaginatorConfig:any;
  // currentPage = 1;
  itemsPerPage = 15;
  rollList:any[]=[]
  maxSize = "7";
  menuListForm:FormGroup;
  search:any;
  overAllMenu:any[]=[]
  constructor(
    private userService: UserServiceService,
    private message: NbToastrService,
    private window:NbWindowService,
    private dialog:NbDialogService,
    private menuService:MenuServiceService,
    private router:Router,
    private hostService:HostServiceService,
    private fb: FormBuilder,
    
  ) {
   
    
   

  }
ngPreparForm(){
  this.menuListForm = this.fb.group({
   SearchByselect:[null],
   SearchBytext:[null]
  })
}
  ngOnInit(): void {
    this.setPageHeader()
    this.agPaginatorConfig={
      id: 'ANGULAR_PAGINATOR_DEFAULT',
      itemsPerPage: this.maxSize,
      currentPage: 1
    }
    this.ngPreparForm();
    this.ngOnInitAPIDatas();
  }
  ngOnInitAPIDatas() {
    this.userService.getUserRoll().subscribe((res: any) => {
      if (res.statuscode === 200) {
        this.rollList = res.data;
        this.menuListForm.controls['SearchByselect'].setValue("1")
        console.log("rolllist",this.rollList);
        
      }
      else {
        this.message.info(res.message, "Info", {
          status: 'info'
        })
      }

    })
    this.menuService.getMenus().subscribe((res: any) => {
      console.log("getMenus", res);
      if (res.statuscode == 200) {
        // this.menuList = res.data;
        this.overAllMenu=res.data;
        this.onChange(this.menuListForm.controls['SearchByselect'].value)
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
      // this.hostService.autoSetMenu()
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
  return data===null?"Parent":this.menuList[this.menuList.findIndex((res:any)=>res.id===data)]['title']
}
currentPage(event:any){
  this.agPaginatorConfig={
    id: 'ANGULAR_PAGINATOR_DEFAULT',
    itemsPerPage: this.maxSize,
    currentPage: event
  }
}
onChange(data:any){
  // this.newMenu=true
  console.log("selected",data);
  this.menuList=this.overAllMenu.filter((menu:any)=>{
    if(Number(menu.accessInts)===Number(data))return menu
  })
  
}
onKeyUpEvent(event:any){
  this.search=this.menuListForm.controls['SearchBytext'].value;
  console.log("up search",  this.search);
  
}
setPageHeader()
{
  this.router_Name=this.router.url.split('/')
  this.router_Name=this.router_Name.splice(1,2)  
  console.log("menu",this.router_Name);
  
}
}