import { Component, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { NbMediaBreakpointsService, NbMenuItem, NbMenuService, NbSidebarService, NbThemeService } from '@nebular/theme';

import { UserData } from '../../../@core/data/users';
import { LayoutService } from '../../../@core/utils';
import { map, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { HostServiceService } from '../../../Service/host-service.service';

@Component({
  selector: 'ngx-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit, OnDestroy {
// ____________________________Global Variables Section______________________________________________________________
  private destroy$: Subject<void> = new Subject<void>();
  public userPictureOnly: boolean = false;
  public user: any;
  public noteBad:NbMenuItem[]=[{title:'New Notepad',icon:'file-add-outline',link:'/Admin/Notepad/CreateNote'},{title:'All Notepad',icon:'file-text-outline' ,link:'/Admin/Notepad/NotepadList'}]
  public email:NbMenuItem[]=[{title:'Email',icon:'email-outline',link:'/Admin/Email'}]
  public message:NbMenuItem[]=[{title:'Chart',icon:'message-circle-outline',link:'/Admin/Message'}]
  public currentTheme:any
  public themes = [
    {
      value: 'default',
      name: 'Light',
    },
    {
      value: 'dark',
      name: 'Dark',
    },
    {
      value: 'cosmic',
      name: 'Cosmic',
    },
    {
      value: 'corporate',
      name: 'Corporate',
    },
  ];
  public urrentTheme = 'default';
  public userRolInfo:any;
  public userMenu = [ { title: 'Profile' }, { title: 'Log out' } ];
// ____________________________________________________________________________________________________________________
  constructor(private sidebarService: NbSidebarService,
              private menuService: NbMenuService,
              private router:Router,
              private themeService: NbThemeService,
              private userService: UserData,
              private layoutService: LayoutService,
              private hostService:HostServiceService,
              private breakpointService: NbMediaBreakpointsService) {
                this.menuService.onItemClick().subscribe((event) => {
                  console.log(" this.menuService", this.menuService);
                  
                  if (event.item.title === 'Log out') {
                  console.log('logout clicked');
                  this.hostService.removeItem()
                  this.router.navigate(['/Login'])
                  }
                  });
  this.setUserRoll()
                }

  ngOnInit() {
    this.currentTheme = this.themeService.currentTheme;
     this.user = JSON.parse(localStorage.getItem('userInfo'))
     console.log("userinfo");
     
    // this.userService.getUsers()
    //   .pipe(takeUntil(this.destroy$))
    //   .subscribe((users: any) => this.user = users.nick);

    // const { xl } = this.breakpointService.getBreakpointsMap();
    // this.themeService.onMediaQueryChange()
    //   .pipe(
    //     map(([, currentBreakpoint]) => currentBreakpoint.width < xl),
    //     takeUntil(this.destroy$),
    //   )
    //   .subscribe((isLessThanXl: boolean) => this.userPictureOnly = this.user.picture);

    this.themeService.onThemeChange()
      .pipe(
        map(({ name }) => name),
        takeUntil(this.destroy$),
      )
      .subscribe(themeName => this.currentTheme = themeName);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  changeTheme(themeName: string) {
    this.themeService.changeTheme(themeName);
  }

  toggleSidebar(): boolean {
    this.sidebarService.toggle(true, 'menu-sidebar');
    this.layoutService.changeLayoutSize();

    return false;
  }

  navigateHome() {
    this.menuService.navigateHome();
    return false;
  }
  setUserRoll(){
    this.userRolInfo=this.router.url.split('/')
    this.userRolInfo=this.userRolInfo.splice(1,1) 
    console.log("userroll",this.userRolInfo);
  }
}
