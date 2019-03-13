import {Component, OnInit} from '@angular/core';
import {MessageService} from '../../services/message.service';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-sender',
  templateUrl: './sender.component.html',
  styleUrls: ['./sender.component.css']
})
export class SenderComponent implements OnInit {
  author: string;
  text: string;

  constructor(private messageService: MessageService, private authService: AuthService) {
  }

  ngOnInit() {
  }

  sendMessage() {
    this.messageService.postMessage(this.text, this.authService.getUserName()).subscribe();
    this.text = undefined;
  }

  pressKey(event: KeyboardEvent) {
    if (event.ctrlKey && event.code === 'Enter') {
      this.sendMessage();
    }
  }

  isLoggedIn() {
    return this.authService.isLoggedIn();
  }
}
