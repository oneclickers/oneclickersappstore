import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NbToastrService } from '@nebular/theme';
import { HostServiceService } from '../../Service/host-service.service';
import { MenuServiceService } from '../../Service/menu-service.service';
import { UserServiceService } from '../../Service/user-service.service';
@Component({
  selector: 'ngx-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
loginFrom:FormGroup;
formSubmitted:boolean=false;
  constructor(
    private formBuilder:FormBuilder,
    private message:NbToastrService,
    private userService:UserServiceService,
    private menuService:MenuServiceService,
    private hostservice:HostServiceService,
    private router:Router
  ) {
    this.ngPrepareFromControls()
   }

  ngOnInit(): void {
  }
  ngPrepareFromControls(){
   this.loginFrom=this.formBuilder.group(
    {
      email_Id:[null,Validators.required],
      password:[null,Validators.required]
    }
   )
  }
  

get formStatus() {
   return this.loginFrom.controls;
}
  onSubmit(){
this.formSubmitted=true
if(this.loginFrom.invalid){
return;
}
this.userService.login(this.loginFrom.value).subscribe((res:any)=>{
  if(res.statuscode===200){
    this.message.success('Success',res.message,{
      status:'success'
    })
    console.log('loginInfo',res.data);
   this.hostservice.setAuth(res.token);
   this.hostservice.setUserInfo({userName:res.username,userID:res.userId,picture:res.picture,name:res.name})
   this.hostservice.setMenu(res.data);
   this.router.navigate(['/Admin/Dashboard'])


  }
  else{
    this.message.info('Info',res.message,{
      status:'info'
    })
  }
})

  }
}
