import { Component, OnInit } from '@angular/core';
import { NbToastrService, NbWindowService } from '@nebular/theme';
import { UserServiceService } from '../../../Service/user-service.service';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AddMenuPopupComponent } from '../../../popup/popup-component/add-menu-popup/add-menu-popup.component';
import { MenuServiceService } from '../../../Service/menu-service.service';
import { HostServiceService } from '../../../Service/host-service.service';

@Component({
  selector: 'ngx-add-new-menu',
  templateUrl: './add-new-menu.component.html',
  styleUrls: ['./add-new-menu.component.scss']
})
export class AddNewMenuComponent implements OnInit {
  rollList: any[] = [];
  openmenuStructure: boolean = false
  addNewMenuFrom: FormGroup;
  newMenu: boolean = false
  constructor(
    private userService: UserServiceService,
    private message: NbToastrService,
    private fb: FormBuilder,
    private window: NbWindowService,
    private menuService:MenuServiceService,
    private hostservice:HostServiceService
  ) { }

  ngOnInit(): void {
    this.ngPreparForm();
    this.getUserRoll()
  }
  ngPreparForm() {
    this.addNewMenuFrom = this.fb.group({
      menuFor: [null, Validators.required],
      title: [null, Validators.required],
      icon: [null, Validators.required],
      describtion: [null, Validators.required],
      link: [null, Validators.required],
      access:[null, Validators.required],
      children: new FormArray([])
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
  createChildren(menuType:string) {
    return this.fb.group({
      title: [menuType, Validators.required],
      icon: [null, Validators.required],
      describtion: [null, Validators.required],
      link: [`${this.addNewMenuFrom.controls['link'].value}/${menuType}`, Validators.required],
      access:[null, Validators.required],
    })
  }
  addChildrenMenu(menuType:string) {
    this.children.push(this.createChildren(menuType))
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
  var menu:any=this.addNewMenuFrom.value
  menu.c_usr_id =this.hostservice.getUserId()
  this.menuService.addNewMenu(menu).subscribe((res:any)=>{
    if(res.statuscode===200){
      this.hostservice.autoSetMenu()
      // this.menuService.getMenus().subscribe((res:any)=>{
      //   if(res.statuscode===200){
      //     this.hostservice.setMenu(res.data)
      //   }
      // })
      this.message.show(res.message,'Success',{
        status:'success'
      })

    }
    else{
       this.message.show(res.message,'Info',{
        status:'info'
      })
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
        this.addChildrenMenu(res?.title);
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
}
