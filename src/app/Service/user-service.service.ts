import { Injectable } from '@angular/core';
import { BehaviorSubject, forkJoin } from 'rxjs';
import { GPUDServiceService } from './gpudservice.service';
@Injectable({
  providedIn: 'root'
})
export class UserServiceService {
 
protected getUsers_APIURL:string='/user';
protected getUsers_Roll:string='/userroll';
protected getGender_APIURL:string='/gender';
protected login_Api:string='/login'
  constructor(
  private gpupService:GPUDServiceService
  ) { }
  getUsers(){
  return this.gpupService.get(this.getUsers_APIURL)
  }
  getUserRoll(){
  return this.gpupService.get(this.getUsers_Roll)
  }
  getUserRollById(roll_Id:number){
    return this.gpupService.get(`${this.getUsers_Roll}/${roll_Id}`)
    }
  postUserRoll(data:any){
    return this.gpupService.post(this.getUsers_Roll,data)
    }
  putUserRoll(data:any){
    return this.gpupService.put(this.getUsers_Roll,data)
    }
  deleteUserRoll(roll_Id){
    return this.gpupService.delete(`${this.getUsers_Roll}/${roll_Id}`)
  }
  login(data:any){
    return this.gpupService.post(this.login_Api,data)
  }
  getGender(){
    return this.gpupService.get(this.getGender_APIURL) 
  }
  get_UserRoll_Gender(){
  var usRoll:any=this.getUserRoll()
  var gender:any=this.getGender();
  return forkJoin([usRoll,gender])
  }
}
