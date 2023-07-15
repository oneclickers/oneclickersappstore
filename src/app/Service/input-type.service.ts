import { Injectable } from '@angular/core';
import { GPUDServiceService } from './gpudservice.service';

@Injectable({
  providedIn: 'root'
})
export class InputTypeService {
inputType:string='/inputType'
inputDataType:string='/inputDataType'
  constructor( private gpupService:GPUDServiceService) { }
// below Function For InputType
  getInputType(){
    return this.gpupService.get(this.inputType)
    }
    getInputTypeById(roll_Id:number){
      return this.gpupService.get(`${this.inputType}/${roll_Id}`)
      }
    postInputType(data:any){
      return this.gpupService.post(this.inputType,data)
      }
    putInputType(data:any){
      return this.gpupService.put(this.inputType,data)
      }
    deleteInputType(roll_Id:any){
      return this.gpupService.delete(`${this.inputType}/${roll_Id}`)
    }
    // below function for inputDataType

    getInputDataType(){
      return this.gpupService.get(this.inputDataType)
      }
      getInputDataTypeById(roll_Id:number){
        return this.gpupService.get(`${this.inputDataType}/${roll_Id}`)
        }
      postInputDataType(data:any){
        return this.gpupService.post(this.inputDataType,data)
        }
      putInputDataType(data:any){
        return this.gpupService.put(this.inputDataType,data)
        }
      deleteInputDataType(roll_Id:any){
        return this.gpupService.delete(`${this.inputDataType}/${roll_Id}`)
      }


}
