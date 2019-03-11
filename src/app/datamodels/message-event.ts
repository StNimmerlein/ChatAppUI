import {MessageOutput} from './message-output';

export class MessageEvent {
  public Message: MessageOutput;
  public Keys: {
    Id: number,
    Time: string
  };
  public Type: 'INSERT' | 'REMOVE' | 'MODIFY';
}
