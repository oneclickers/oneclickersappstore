import { Component, OnInit } from '@angular/core';
import { NbToastrService, NbWindowService } from '@nebular/theme';
import { UserServiceService } from '../../../Service/user-service.service';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AddMenuPopupComponent } from '../../../popup/popup-component/add-menu-popup/add-menu-popup.component';
import { MenuServiceService } from '../../../Service/menu-service.service';
import { HostServiceService } from '../../../Service/host-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, forkJoin } from 'rxjs';

@Component({
  selector: 'ngx-edit-menu',
  templateUrl: './edit-menu.component.html',
  styleUrls: ['./edit-menu.component.scss']
})
export class EditMenuComponent implements OnInit {
  rollList: any[] = [];
  public router_Name:any=[]
  menuID:number;
  openmenuStructure: boolean = false
  addNewMenuFrom: FormGroup;
  newMenu: boolean = false
  userID:number;
  getMenu:boolean=false;
  constructor(
    private userService: UserServiceService,
    private message: NbToastrService,
    private fb: FormBuilder,
    private window: NbWindowService,
    private menuService:MenuServiceService,
    private hostservice:HostServiceService,
    private router:ActivatedRoute,
    private routers:Router,
    // private routers:Router,
  ) {

    
   }

  ngOnInit(): void {
    this.setPageHeader()
    this.userID=this.hostservice.getUserId();
    console.log("userIdForedit",this.userID);
    
    this.router.paramMap.subscribe((res:any)=>{
      console.log("pramsmap",res);
      this.menuID=res.params.id
      this.getMenu=true
    });
    this.ngPreparForm();
    this.getComponentInitialData()
    
    
   
    // this.getUserRoll();
   
  }
  getComponentInitialData(){
//    const observable =new Observable()
//    observable.subscribe(this.userService.getUserRoll())
//    observable.subscribe(this.menuService.getMenuById(this.menuID));
//    observable.subscribe((res:any)=>{
// console.log("jhvckdvcjdv",res);

//    })
    this.userService.getUserRoll().subscribe((res: any) => {
      if (res.statuscode === 200) {
        this.rollList = res.data;
        console.log("userrol",this.rollList);
        
      }
      else {
        this.message.info(res.message, "Info", {
          status: 'info'
        })
      }

    })
    if(this.getMenu){
      this.menuService.getMenuById(this.menuID).subscribe((res:any)=>{
        console.log("getMenuForEdit",res);
        if(res.statuscode===200){
          console.log("getMenuForEditdsds",res);
          var menu=res.data[0]
          console.log("resmenu",menu);
    

          this.addNewMenuFrom = this.fb.group({
            id: [menu.id, Validators.required],
            menuFor: [this.rollList[this.rollList.findIndex((data:any)=>(data.roll_Id)==Number(menu.access))]['roll_Name'], Validators.required],
            title:   [menu.title, Validators.required],
            icon:    [menu.icon, Validators.required],
            describtion: [menu.describtion, Validators.required],
            link:        [menu.link, Validators.required],
            access:      [menu.access, Validators.required],
            parentInt:[menu.parentInt],
            children:    new FormArray(menu.children.map((child:any)=>this.createChildren(child))),
            m_usr_id:[this.userID],
           
          })
          this.newMenu=false;
          this.openmenuStructure=true
          console.log("form",this.addNewMenuFrom);
          // console.log("test",this.rollList.findIndex((data:any)=>data.roll_Id==menu.access));
          // this.addNewMenuFrom.controls['id'].setValue(menu.id);
          // this.addNewMenuFrom.controls['menuFor'].setValue(this.rollList[this.rollList.findIndex((data:any)=>(data.roll_Id)==menu.access)]['roll_Name']);
          // this.addNewMenuFrom.controls['title'].setValue(menu.title);
          // this.addNewMenuFrom.controls['icon'].setValue(menu.icon);
          // this.addNewMenuFrom.controls['describtion'].setValue(menu.describtion);
          // this.addNewMenuFrom.controls['link'].setValue(menu.link);
          // this.addNewMenuFrom.controls['access'].setValue(menu.access);
          // this.addNewMenuFrom.controls['children'].setValue(menu.children.map((child:any)=>this.addChildrenMenu(child)));
           }
       
      })
      // console.log("form",this.addNewMenuFrom.value);
    }
  
  }
  ngPreparForm() {
    this.addNewMenuFrom = this.fb.group({
      id: [null, Validators.required],
      menuFor: [null, Validators.required],
      title:   [null, Validators.required],
      icon:    [null, Validators.required],
      describtion: [null, Validators.required],
      link:        [null, Validators.required],
      access:      [null, Validators.required],
      children:    new FormArray([]),
      m_usr_id:[this.userID],
      parentInt:[null]
      // m_usr_id:[this.userID,Validators]
    })
  
  }
  getUserRoll() {
    this.userService.getUserRoll().subscribe((res: any) => {
      if (res.statuscode === 200) {
        this.rollList = res.data
      }
      else {
        this.message.info(res.message, "Info", {
          status: 'info'
        })
      }

    })
  }
  get children() {
    return this.addNewMenuFrom.get('children') as FormArray
  }
  createChildren(child:any) {
    console.log("filanl data",child);
    
    return this.fb.group({
      id: [child.id, Validators.required],
      title: [child.title, Validators.required],
      icon: [child.icon, Validators.required],
      describtion: [child.Description, Validators.required],
      link: [child.link, Validators.required],
      access:[child.accessInts, Validators.required],
      parentInt:[child.parentInt],
      m_usr_id:[this.userID]
    })
  }
  createSubmenuManualy(data:any){
    return this.fb.group({
      id:[null],
      title: [data, Validators.required],
      icon: [null, Validators.required],
      describtion: [null, Validators.required],
      parentInt:[this.addNewMenuFrom.controls['id'].value,Validators.required],
      link: [`${this.addNewMenuFrom.controls['link'].value}/${data}`, Validators.required],
      access:[this.addNewMenuFrom.controls['access'].value, Validators.required],
      c_usr_id:[this.userID]
    })
  }
  addChildrenMenu(menuType:any) {
    this.children.push(this.createChildren(menuType))
  }
  addChildrenManualy(menuType:any) {
    this.children.push(this.createSubmenuManualy(menuType))
  }
  onSubmit() {
if(this.addNewMenuFrom.invalid){
  this.message.show('Please Fill All Mandatroy Filed','InFo',{
    status:'info'
  })
  return
}
else{
  console.log("post",this.addNewMenuFrom.value);
  var menu:any=this.addNewMenuFrom.value;
var model:any=[]
  model.push(menu)
  this.menuService.editMenu(model).subscribe((res:any)=>{
    if(res.statuscode===200){
     
      this.message.show(res.message,'Success',{
        status:'success'
      })
this.routers.navigate(['/Admin/MenuManager/MenuList'])
    }
    else{
       this.message.show(res.message,'Info',{
        status:'info'
      })
      this.routers.navigate(['/Admin/MenuManager/MenuList'])
    }
  })
}
  }
  openANMPopup(menuType:string) {

    this.window.open(AddMenuPopupComponent, {
      title:menuType==='newMenu'?'create New Menu':'Create Sub Menu',
      context:{
       menuType:menuType
      },
      buttons: {
        minimize: false,
        maximize: false,
      }
    }).onClose.subscribe((res: any) => {
      if(res?.menuType==='newMenu'){
        this.openmenuStructure = true;
        this.addNewMenuFrom.controls['title'].setValue(res?.title)
        this.addNewMenuFrom.controls['link'].setValue(`/${this.addNewMenuFrom.controls['menuFor'].value}/${this.addNewMenuFrom.controls['title'].value}`)
        console.log("formValues",this.addNewMenuFrom.value);
        
      }else if(res?.menuType==='subMenu'){
        this.addChildrenManualy(res?.title);
        console.log("submenu",this.addNewMenuFrom.get('children').value);
        console.log("form",this.addNewMenuFrom.controls.value);
        
      }  
      
      // if(){

      // }
    })
  }
  onChange(data:any){
    this.newMenu=true
  }
  setPageHeader()
  {
    this.router_Name=this.routers.url.split('/')
    this.router_Name=this.router_Name.splice(1,2)  
    console.log("menu",this.router_Name);
    
  }
}