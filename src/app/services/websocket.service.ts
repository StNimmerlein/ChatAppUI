import {Injectable} from '@angular/core';
import {Observable, Observer, Subject} from 'rxjs';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  private WEBSOCKET_URL = environment.webSocketUrl;
  private subject: Subject<MessageEvent>;

  constructor() {
  }

  public connect(): Subject<MessageEvent> {
    if (!this.subject) {
      this.subject = this.create(this.WEBSOCKET_URL);
    }
    return this.subject;
  }

  private create(url: string): Subject<MessageEvent> {
    const ws = new WebSocket(url);
    const observable = Observable.create((obs: Observer<MessageEvent>) => {
      ws.onmessage = obs.next.bind(obs);
      ws.onerror = obs.next.bind(obs);
      ws.onclose = obs.complete.bind(obs);
      return ws.close.bind(ws);
    });
    const observer = {
      next: (data) => {
        if (ws.readyState === WebSocket.OPEN) {
          ws.send(JSON.stringify(data));
        }
      }
    };
    return Subject.create(observer, observable);
  }
}
