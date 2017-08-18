import { Component, OnInit } from '@angular/core';

import { ViewService } from '../service/view.service'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  private view : string = "MIX"
  
  constructor(private viewService:ViewService) {
   }

  ngOnInit() {
    console.log("Home component initializing ...");
    let menu = <HTMLElement>document.querySelector ('#mysidemenu');
    menu.style.display='none';

  }

  private showMenu(){
    let menu = <HTMLElement>document.querySelector ('#mysidemenu');
      menu.style.display='block';
  }

  private hideMenu(){
    let menu = <HTMLElement>document.querySelector ('#mysidemenu');
      menu.style.display='none';
  }

  private toggleView (view : string) {
    this.hideMenu();
    let chatboxEl = <HTMLElement>document.querySelector ('#chatbox');
    let inspectEl = <HTMLElement>document.querySelector ('.inspect');
    let convEl = <HTMLElement>document.querySelector ('#messages');
    
    switch (view) {
      case 'CONV': 
/*         if (chatboxEl.classList.contains('wrapperUTH'))
          chatboxEl.classList.remove('wrapperUTH');
        if (chatboxEl.classList.contains('wrapperMIX'))
          chatboxEl.classList.remove('wrapperMIX');
        chatboxEl.classList.add('wrapperCONV');
        convEl.style.display='block';
        inspectEl.style.display='none';
 */        
        this.viewService.setToCONV();
        break;
      case 'UTH':
/*         if (chatboxEl.classList.contains('wrapperCONV'))
          chatboxEl.classList.remove('wrapperCONV');
        if (chatboxEl.classList.contains('wrapperMIX'))
          chatboxEl.classList.remove('wrapperMIX');
        chatboxEl.classList.add('wrapperUTH');
        convEl.style.display='none';
        inspectEl.style.display='block';
 */
        this.viewService.setToUTH();
        break;
      case 'MIX':
/*         if (chatboxEl.classList.contains('wrapperUTH'))
          chatboxEl.classList.remove('wrapperUTH');
        if (chatboxEl.classList.contains('wrapperCONV'))
          chatboxEl.classList.remove('wrapperCONV');
        chatboxEl.classList.add('wrapperMIX');
        convEl.style.display='block';
        inspectEl.style.display='block';
 */
        this.viewService.setToMIX();
        break;
    }
/*     let toggleButton = <HTMLElement>document.querySelector ('#view-change-button');
 *//*    let rightColumn = <HTMLElement>document.querySelector ('.right');
*//*     let rightColumn = <HTMLElement>document.querySelector ('.payloadBox');
    let element;
    if (event.srcElement) {
      element = event.srcElement;
    } else {
      element = event.target;
    }
    if (toggleButton.classList.contains ('full')) {
      toggleButton.classList.remove ('full');
      chatboxEl.classList.remove ('wrappernoinspect');
      chatboxEl.classList.add ('wrapper');
    } else {
      toggleButton.classList.add ('full');
      chatboxEl.classList.remove ('wrapper');
      chatboxEl.classList.add ('wrappernoinspect');
    }
 */  }

  
  /*
  * This method is responsible for toggling the payload section to full screen or fixed layout by
  * clicking the Code Expand/Collapse icons at the top right .
  */
    private togglePanel (event) {
      let chatboxEl = <HTMLElement>document.querySelector ('#chatbox');
      let toggleButton = <HTMLElement>document.querySelector ('#view-change-button');
  /*    let rightColumn = <HTMLElement>document.querySelector ('.right');
  */    let rightColumn = <HTMLElement>document.querySelector ('.payloadBox');
      let element;
      if (event.srcElement) {
        element = event.srcElement;
      } else {
        element = event.target;
      }
      if (toggleButton.classList.contains ('full')) {
        toggleButton.classList.remove ('full');
        chatboxEl.classList.remove ('wrappernoinspect');
        chatboxEl.classList.add ('wrapper');
      } else {
        toggleButton.classList.add ('full');
        chatboxEl.classList.remove ('wrapper');
        chatboxEl.classList.add ('wrappernoinspect');
      }
    }

}
