import { Component, OnInit } from '@angular/core';

import { ViewService } from '../service/view.service'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  private view : string = "MIX"
  private menu: boolean = false;
  
  constructor(private viewService:ViewService) {
   }

  ngOnInit() {
    console.log("Home component initializing ...");
  }

  private showMenu(){
    this.menu = true;
  }

  private hideMenu(){
    this.menu = false;
  }

  private toggleView (view : string) {
    this.hideMenu();    
    switch (view) {
      case 'CONV': 
        this.viewService.setToCONV();
        break;
      case 'UTH':
        this.viewService.setToUTH();
        break;
      case 'MIX':
        this.viewService.setToMIX();
        break;
    }
  }

}
