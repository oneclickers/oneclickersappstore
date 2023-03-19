import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MENU_ITEMS } from '../pages/pages-menu';
@Component({
  selector: 'ngx-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  public router_Name:any
  public menu = MENU_ITEMS;
  constructor(
    private router:Router
  ) { }

  ngOnInit(): void {
  }
  changeOfRoutes(){
    
  console.log('setpageHeader',this.router_Name);
  
  this.router_Name=this.router.url.split('/')
  }
}
