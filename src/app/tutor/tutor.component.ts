import { Component, OnInit } from '@angular/core';
import { MENU_ITEMS } from '../pages/pages-menu';
@Component({
  selector: 'ngx-tutor',
  templateUrl: './tutor.component.html',
  styleUrls: ['./tutor.component.scss']
})
export class TutorComponent implements OnInit {
  menu = MENU_ITEMS;
  constructor() { }

  ngOnInit(): void {
  }

}
