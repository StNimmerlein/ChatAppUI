import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-user-bar',
  templateUrl: './user-bar.component.html',
  styleUrls: ['./user-bar.component.css']
})
export class UserBarComponent implements OnInit {

  constructor(private authService: AuthService) {
  }

  ngOnInit() {
    this.authService.parseUrl(window.location.href);
    history.replaceState(history.state, 'ChatTool', '/');
  }

  login() {
    window.location.href = this.authService.getLoginUrl();
  }

  logout() {
    this.authService.logout();
  }

  isLoggedIn() {
    return this.authService.isLoggedIn();
  }

  getUserName() {
    return this.authService.getUserName();
  }
}
