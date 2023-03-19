import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HostServiceService {
protected LclSryDtaBhorSuct=new BehaviorSubject<any>(null);
public LclSryDta$=this.LclSryDtaBhorSuct.asObservable();
public token:string;
  constructor() { }
  setLocalStorageData(data:any){
    this.LclSryDtaBhorSuct.next(data)
  }
  setAuth(token:string){
    this.token=token
  }
  getAuth(){
    this.token
  }
}
