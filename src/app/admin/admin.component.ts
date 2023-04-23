import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NbMenuItem, NbToastrService } from '@nebular/theme';
import { MENU_ITEMS } from '../pages/pages-menu';
import { HostServiceService } from '../Service/host-service.service';
import { MenuServiceService } from '../Service/menu-service.service';
@Component({
  selector: 'ngx-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  public router_Name: any
  public menu: NbMenuItem[] = [];
  constructor(
    private router: Router,
    private hostService: HostServiceService,
    public message: NbToastrService
  ) {
    this.hostService.menuList$.subscribe((menuList: any) => {
      console.log("testmenu");
      
      if (menuList?.length > 0 && menuList != null) {
        this.menu = menuList
        console.log("menulist", this.menu);
      }
      else {
        this.message.danger('Danger', 'Menu Does Not List Please loging Again', {
          status: 'danger'
        })
        
      }
    })
   
  }

  ngOnInit(): void {
    this.menu = this.hostService.getMenu();
        console.log("menulist",this.menu);
    
  }
  changeOfRoutes() {

    console.log('setpageHeader', this.router_Name);

    this.router_Name = this.router.url.split('/')
  }
}
