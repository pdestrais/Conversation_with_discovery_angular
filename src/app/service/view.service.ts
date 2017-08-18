import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
 
export interface ViewState {
  viewClass: string;
}
 
@Injectable()
export class ViewService {
  private viewSubject = new Subject<ViewState>();
 
  viewState = this.viewSubject.asObservable();
 
  constructor() { }
 
  setToMIX() {
    this.viewSubject.next(<ViewState>{ viewClass: 'wrapperMIX' });
  }
 
  setToUTH() {
    this.viewSubject.next(<ViewState>{ viewClass: 'wrapperUTH' });
  }

  setToCONV() {
    this.viewSubject.next(<ViewState>{ viewClass: 'wrapperCONV' });
  }
}