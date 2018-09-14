import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MessageInputService {

  messageInputValue: string;

  constructor() {}

  setMessageValue(data) {
    this.messageInputValue = data;
  }
}
