import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'ngx-note-pad',
  templateUrl: './note-pad.component.html',
  styleUrls: ['./note-pad.component.scss']
})
export class NotePadComponent implements OnInit ,OnChanges  {
  router_Name:any=[]
  @Input() inpTNotePad:string
  constructor(
    private router:Router,
  ) {

  }
  ngOnChanges(changes: SimpleChanges): void {
    // throw new Error('Method not implemented.');
  }

  ngOnInit(): void {
  }

  setPageHeader(){
    this.router_Name=this.router.url.split('/')
    this.router_Name=this.router_Name.splice(2,3)
  }
}
