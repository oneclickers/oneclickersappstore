import { Injectable } from '@angular/core';
import { GPUDServiceService } from './gpudservice.service';

@Injectable({
  providedIn: 'root'
})
export class UiServiceService {
uiList:string="/dynamicui"
  constructor( private gpupService:GPUDServiceService) { }

  getUIList(){
    console.log("data");
    
    return this.gpupService.get(this.uiList)
    }
    addUIList(data:any){
      return this.gpupService.post(this.uiList,data)
      }
}
