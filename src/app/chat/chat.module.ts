import { NgModule }           from '@angular/core'
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms'
import { ChatComponent }   from './chat.component';
import { DialogService }     from './dialog.service';
import {CeDocComponent} from './ce.docs';
import {PayloadComponent} from './payload';

@NgModule({
  	imports: [ CommonModule,FormsModule ],
  declarations: [ CeDocComponent, PayloadComponent, ChatComponent],
  exports:      [ ChatComponent ],
  providers:    [ DialogService ]
})
export class ChatModule { }