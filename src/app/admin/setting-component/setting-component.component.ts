import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NbMenuModule, NbMenuService } from '@nebular/theme';

@Component({
  selector: 'ngx-setting-component',
  templateUrl: './setting-component.component.html',
  styleUrls: ['./setting-component.component.scss'],
  
})
export class SettingComponentComponent implements OnInit {
  public setting_Menu:NbMenuModule=[];
  public router_Name:any=[]
  constructor(
    private router:Router,
    private menuService:NbMenuService,
   
    ) {
  //  this.menuService.onItemClick().subscribe((event) => {
  //   this.setPageHeader()
  //   console.log('logout clicked');
  //   if (event.item.title === 'Log out') {
  //   console.log('logout clicked');
  //   }
  //   });
   }

  ngOnInit(): void {
    this.setting_Menu=[
      {
        title: 'Profile-Setting',
        icon: 'person-outline',
        link:'/Admin/Setting/Profile-Setting'
      },
      {
        title: 'Language-Setting',
        icon: 'globe-2-outline',
        link:'/Admin/Setting/Language-Setting'
      },
      {
        title: 'Appearance-Setting',
        icon: 'options-2-outline',
        link:'/Admin/Setting/Appearance-Setting'
      },
      {
        title: 'Notification-Setting',
        icon: 'bell-outline',
        link:'/Admin/Setting/Notification-Setting'
      },
    ]
  }

setPageHeader()
{
  this.router_Name=this.router.url.split('/')
  this.router_Name=this.router_Name.splice(2,3)  
}}
