export class MessageInput {


  constructor(text: string, author: string) {
    this.text = text;
    this.author = author;
  }

  public text: string;
  public author: string;
}
