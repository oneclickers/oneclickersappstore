import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { GPUDServiceService } from './gpudservice.service';
@Injectable({
  providedIn: 'root'
})
export class MenuServiceService {
  public Menus_APIURL:string='/menu'
  public menu:any[]=[]
  protected menuBS$=new BehaviorSubject<any>(null);
  public menuList$=this.menuBS$.asObservable();
  constructor(
    private gpupService:GPUDServiceService
  ) { }
  // setMenuList(data:any){
  //   this.menuBS$.next(data);
  // }
  // getMenuList(){
  // return this.menu
  // }
  getMenus(){
    return this.gpupService.get(this.Menus_APIURL)
  }
  addNewMenu(data:any){
    return this.gpupService.post(this.Menus_APIURL,data)
  }
  deleteMenu(id:any){
    return this.gpupService.delete(`${this.Menus_APIURL}/${id}`)
  }
  getMenuById(id:any){
    return this.gpupService.get(`${this.Menus_APIURL}/${id}`)
  }
  editMenu(data:any){
    return this.gpupService.post(this.Menus_APIURL,data)
  }
}

