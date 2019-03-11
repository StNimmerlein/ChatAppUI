import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {MessageOutput} from '../datamodels/message-output';
import {Observable, of, Subject} from 'rxjs';
import {MessageEvent} from '../datamodels/message-event';
import {MessageInput} from '../datamodels/message-input';
import {WebsocketService} from './websocket.service';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  private readonly useDummy = false;

  private readonly apiPath = 'https://6p7qatgrc6.execute-api.eu-west-1.amazonaws.com/prod';
  private readonly options: { headers: HttpHeaders };
  private messagesSubject: Subject<MessageEvent>;

  constructor(private httpClient: HttpClient, private websocketService: WebsocketService) {
    this.options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json').set('Accept', 'application/json')
    };
    this.messagesSubject = this.websocketService.connect().pipe(map(response => {
      return JSON.parse(response.data);
    })) as Subject<MessageEvent>;
  }

  public getMessagesSubject() {
    return this.messagesSubject;
  }

  public deleteMessage(message: MessageOutput) {
    if (this.useDummy) {
      return of(undefined);
    }
    return this.httpClient.delete(`${this.apiPath}/message?id=${message.Id}&time=${new Date(message.Time).toISOString()}`);
  }

  public getMessages(startingAt: Date): Observable<MessageOutput[]> {
    if (this.useDummy) {
      return of([{
        Id: 6122357,
        Time: '2019-03-06T09:44:48.753+00:00',
        Author: 'Marco',
        Text: 'Ich bin eine Nachricht'
      }, {
        Id: 55144039,
        Time: '2019-03-06T09:45:35.212+00:00',
        Author: 'Marco',
        Text: 'Ich auch!'
      }, {
        Id: 6122357,
        Time: '2019-03-06T10:39:40.858+00:00',
        Author: 'Hugo',
        Text: 'Hallo, noch da?'
      }]);
    }
    return this.httpClient.get<MessageOutput[]>(
      `${this.apiPath}/message?startingAfter=${startingAt.toISOString()}`,
      this.options);
  }

  public postMessage(text: string, author: string) {
    if (this.useDummy) {
      return of(undefined);
    }
    return this.httpClient.post(`${this.apiPath}/message`, new MessageInput(text, author), this.options);
  }
}
