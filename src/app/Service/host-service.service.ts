import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { MenuServiceService } from './menu-service.service';

@Injectable({
  providedIn: 'root'
})
export class HostServiceService {
userid:any
protected LclSryDtaBhorSuct=new BehaviorSubject<any>(null);
public LclSryDta$=this.LclSryDtaBhorSuct.asObservable();
public token:string;
protected menuBS$=new BehaviorSubject<any>(null);
public menuList$=this.menuBS$.asObservable();
  constructor(
    private menuService:MenuServiceService
  ) { }
  setLocalStorageData(data:any){
    this.LclSryDtaBhorSuct.next(data)
  }
  setAuth(token:string){
    this.token=token
    console.log("Token",this.token);
  }
  getAuth(){
    this.token
  }
  setMenu(menu:any){
    localStorage.removeItem('menu')
    localStorage.setItem('menu',JSON.stringify(menu))
    this.menuBS$.next(menu);
  }
  setUserInfo(data:any){
    console.log();
    this.userid=data.userID
    localStorage.removeItem('userInfo')
    localStorage.setItem('userInfo',JSON.stringify({userName:data.userName,userID:data.userID,picture:data.picture,name:data.name}))
  }
  getMenu(){
    return JSON.parse(localStorage.getItem('menu'))
  }
  autoSetMenu(){
    this.menuService.getMenus().subscribe((res:any)=>{
      console.log("autoSetMenuRes:1",res);
      
      if(res.statuscode===200){
        console.log("autoSetMenuRes:2",res);
        // this.menuBS$.next(null);
        this.menuBS$.next(res.data);
        localStorage.removeItem('menu')
        localStorage.setItem('menu',JSON.stringify(res.data))
       
      }
    })
  }
  getUserId(){
    var userInfo=JSON.parse(localStorage.getItem('userInfo'));
    
    console.log("local data",userInfo);
    
   return userInfo.userID
  }
  getUserName(){
    var userInfo=JSON.parse(localStorage.getItem('userInfo'));
    
    console.log("local data",userInfo);
    
   return userInfo.userName
  }
  removeItem(){
    localStorage.removeItem('userInfo')
    localStorage.removeItem('menu')
  }
}
