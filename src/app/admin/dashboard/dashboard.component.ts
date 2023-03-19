import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserServiceService } from '../../Service/user-service.service';

@Component({
  selector: 'ngx-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  router_Name:any=[]
  constructor(
    private router:Router,
    private userService:UserServiceService
  ) { 

    this.userService.getUsers().subscribe((res:any)=>{
      console.log("gerUsers",res);
      
     })
  }

  ngOnInit(): void {
    this.setPageHeader()
  }
  setPageHeader(){
    this.router_Name=this.router.url.split('/')
    console.log("this.router_Name",this.router_Name);
    
    this.router_Name=this.router_Name.splice(2,3)
  }
}
