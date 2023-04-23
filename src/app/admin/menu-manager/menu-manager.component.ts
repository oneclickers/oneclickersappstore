import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NbMenuService } from '@nebular/theme';

@Component({
  selector: 'ngx-menu-manager',
  templateUrl: './menu-manager.component.html',
  styleUrls: ['./menu-manager.component.scss']
})
export class MenuManagerComponent implements OnInit {
  public router_Name:any=[]

  constructor(
    private router:Router,
    private menuService:NbMenuService,
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
}
