import {Component, Input, OnInit} from '@angular/core';
import {MessageOutput} from '../../datamodels/message-output';
import {MessageService} from '../../services/message.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {

  @Input()
  message: MessageOutput;
  @Input()
  shaded: boolean;

  constructor(private messageService: MessageService) {
  }

  ngOnInit() {
  }

  formatDateTime(dateString: string) {
    const date = new Date(dateString);
    if (!this.isToday(date)) {
      return date.toLocaleString();
    }
    return date.toLocaleTimeString();
  }

  private isToday(date: Date) {
    const today = new Date();
    return date.getDate() === today.getDate() && date.getMonth() === today.getMonth() && date.getFullYear() === today.getFullYear();
  }

  delete() {
    this.messageService.deleteMessage(this.message).subscribe();
  }
}
