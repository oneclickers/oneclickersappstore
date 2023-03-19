import { Injectable } from '@angular/core';
import{HttpClient,HttpHeaders}from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GPUDServiceService {
  constructor(
    private http:HttpClient,
    ) {}
    post(URL:string,body:any):any{
      console.log("api",URL,body);
      
     return this.http.post(URL,body)
    }
    get(URL:any):any{
      console.log("url");
      
      return this.http.get(URL)
    }
    put(URL:string,body:any){
      return this.http.put(URL,body)
    }
    delete(URL){
      return this.http.delete(URL)
    }
}
