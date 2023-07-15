import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'ngx-update-basic-info',
  templateUrl: './update-basic-info.component.html',
  styleUrls: ['./update-basic-info.component.scss']
})
export class UpdateBasicInfoComponent implements OnInit {
  public router_Name:any=[]

  constructor(
    private router:Router,
     ) { }

  ngOnInit(): void {
    this.setPageHeader()
  }
  setPageHeader()
  {
    this.router_Name=this.router.url.split('/')
    this.router_Name=this.router_Name.splice(1,2)  
    console.log("menu",this.router_Name);
    
  }
  onKeyUpEvent(event:any){

  }
  AddNewMenu(){

  }
  onChange(data:any){

  }
}
