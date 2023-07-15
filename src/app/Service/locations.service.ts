import { Injectable } from '@angular/core';
import { GPUDServiceService } from './gpudservice.service';

@Injectable({
  providedIn: 'root'
})
export class LocationsService {
  protected country_APIURL:string='/country';
  protected state_APIURL:string='/state';
  protected district_APIURL:string='/district';
  protected city_APIURL:string='/city';
  protected getUsers_Roll:string='/userroll';
  protected getGender_APIURL:string='/gender';
  protected login_Api:string='/login'
    constructor(
    private gpupService:GPUDServiceService
    ) { }
    // Country
    getCountry(){
    return this.gpupService.get(this.country_APIURL)
    }
    getCountryById(Id:number){
      return this.gpupService.get(`${this.country_APIURL}/${Id}`)
      }
      addCountry(data:any){
      return this.gpupService.post(this.country_APIURL,data)
      }
      updateCountry(data:any){
      return this.gpupService.put(this.country_APIURL,data)
      }
    deleteCountry(Id:any){
      return this.gpupService.delete(`${this.country_APIURL}/${Id}`)
    }
    // ____________________________________________________________________________

     // State
      getState(){
      return this.gpupService.get(this.state_APIURL)
      }
      getStateById(Id:number){
        return this.gpupService.get(`${this.state_APIURL}/${Id}`)
        }
        addState(data:any){
        return this.gpupService.post(this.state_APIURL,data)
        }
        updateState(data:any){
        return this.gpupService.put(this.state_APIURL,data)
        }
      deleteState(Id:any){
        return this.gpupService.delete(`${this.state_APIURL}/${Id}`)
      }
      // _____________________________________________________________________________
      getDistrict(){
        return this.gpupService.get(this.district_APIURL)
      }
      geDistrictById(Id:number){
        return this.gpupService.get(`${this.district_APIURL}/${Id}`)
        }
        addDistrict(data:any){
        return this.gpupService.post(this.district_APIURL,data)
        }
        updateDistrict(data:any){
        return this.gpupService.put(this.district_APIURL,data)
        }
      deleteDistrict(Id:any){
        return this.gpupService.delete(`${this.district_APIURL}/${Id}`)
      }
      // _________________________________________________
      getCity(){
        return this.gpupService.get(this.city_APIURL)
      }
      geCityById(Id:number){
        return this.gpupService.get(`${this.city_APIURL}/${Id}`)
        }
        addCity(data:any){
        return this.gpupService.post(this.city_APIURL,data)
        }
        updateCity(data:any){
        return this.gpupService.put(this.city_APIURL,data)
        }
      deleteCity(Id:any){
        return this.gpupService.delete(`${this.city_APIURL}/${Id}`)
      }
  }
