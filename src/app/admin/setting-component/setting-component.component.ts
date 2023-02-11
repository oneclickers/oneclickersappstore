import { Component, OnInit } from '@angular/core';
import { NbMenuModule } from '@nebular/theme';

@Component({
  selector: 'ngx-setting-component',
  templateUrl: './setting-component.component.html',
  styleUrls: ['./setting-component.component.scss']
})
export class SettingComponentComponent implements OnInit {
  setting_Menu:NbMenuModule[]
  constructor() { }

  ngOnInit(): void {
    this.setting_Menu=[
      {
        title: 'Profile-Setting',
        icon: 'settings-outline',
       
      },
      {
        title: 'Language-Setting',
        icon: 'settings-outline',
       
      },
      {
        title: 'Theme-Setting',
        icon: 'settings-outline',
       
      },
      {
        title: 'Notification-Setting',
        icon: 'settings-outline',
       
      },
    ]
  }

}
