import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { MessageHistoryComponent } from './components/message-history/message-history.component';
import { MessageComponent } from './components/message/message.component';
import {MessageService} from './services/message.service';
import {HttpClientModule} from '@angular/common/http';
import { SenderComponent } from './components/sender/sender.component';
import {FormsModule} from '@angular/forms';
import {WebsocketService} from './services/websocket.service';

@NgModule({
  declarations: [
    AppComponent,
    MessageHistoryComponent,
    MessageComponent,
    SenderComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    MessageService,
    WebsocketService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
