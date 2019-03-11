import {Component, OnInit} from '@angular/core';
import {MessageService} from '../../services/message.service';

@Component({
  selector: 'app-sender',
  templateUrl: './sender.component.html',
  styleUrls: ['./sender.component.css']
})
export class SenderComponent implements OnInit {
  author: string;
  text: string;

  constructor(private messageService: MessageService) {
  }

  ngOnInit() {
  }

  sendMessage() {
    this.messageService.postMessage(this.text, this.author).subscribe();
    this.text = undefined;
  }

  pressKey(event: KeyboardEvent) {
    if (event.ctrlKey && event.code === 'Enter') {
      this.sendMessage();
    }
  }
}
