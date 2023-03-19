import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'ngx-chat-part',
  templateUrl: './chat-part.component.html',
  styleUrls: ['./chat-part.component.scss']
})
export class ChatPartComponent implements OnInit {
  router_Name:any=[]
  constructor(
    private router:Router,
  ) { }

  ngOnInit(): void {
    this.setPageHeader()
  }
  setPageHeader(){
    this.router_Name=this.router.url.split('/')
    console.log("this.router_Name",this.router_Name);
    
    this.router_Name=this.router_Name.splice(2,3)
  }
}
