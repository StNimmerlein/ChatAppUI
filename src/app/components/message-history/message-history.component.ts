import {Component, OnDestroy, OnInit} from '@angular/core';
import {MessageService} from '../../services/message.service';
import {MessageOutput} from '../../datamodels/message-output';
import {interval, Observable, Subscription} from 'rxjs';

@Component({
  selector: 'app-message-history',
  templateUrl: './message-history.component.html',
  styleUrls: ['./message-history.component.css']
})
export class MessageHistoryComponent implements OnInit, OnDestroy {

  messages: MessageOutput[] = [];

  private updateInterval = 5;
  private scheduler: Subscription;
  updateEnabled = false;

  constructor(private messageService: MessageService) {
  }

  ngOnInit() {
    this.update();
    this.scheduler = interval(this.updateInterval * 1000).subscribe(() => {
      if (this.updateEnabled) {
        this.update();
      }
    });
    this.messageService.getMessagesSubject().subscribe((message) => {
      if (message.Type === 'INSERT') {
        this.messages.push(message.Message);
      }
      if (message.Type === 'REMOVE') {
        this.messages = this.messages.filter((msg) =>
          msg.Id !== message.Keys.Id || msg.Time !== message.Keys.Time
        );
      }
    });
  }

  ngOnDestroy(): void {
    this.scheduler.unsubscribe();
  }

  private update() {
    this.messageService.getMessages(this.getLastMessageTime()).subscribe(messages => {
        this.messages = this.messages.concat(messages);
      }
    );
  }

  private getLastMessageTime() {
    if (this.messages.length > 0) {
      return new Date(this.messages[this.messages.length - 1].Time);
    }
    const date = new Date();
    date.setDate(date.getDate() - 1);
    return date;
  }


}
