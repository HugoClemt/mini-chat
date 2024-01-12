import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ParseLinkPipe } from '../parse-link.pipe';
import { SendMessageComponent } from '../send-message.component';
import { interval } from 'rxjs/internal/observable/interval';
import { HttpClient } from '@angular/common/http';
import { fromEvent } from 'rxjs';
import { Message } from '../interface/message.interface';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-messenger',
  standalone: true,
  animations: [
    trigger('fadeIn', [
        transition(':enter', [
            style({ opacity: 0 }),
            animate('150ms', style({ opacity: 1 }))
        ])
    ])
],
  imports: [
    FormsModule,
    SendMessageComponent,
    CommonModule,
    ParseLinkPipe
],
  templateUrl: './messenger.component.html',
  styleUrl: './messenger.component.scss'
})
export class MessengerComponent {

  loggedIn = false;

  messages: Message[] = [];

  username = '';

  http = inject(HttpClient);
  

  constructor() {
    fromEvent(window, 'storage').subscribe((event) => {
      //console.log(event)
      let messages = localStorage.getItem('messages');
      if(messages){
        let parsedMessages = JSON.parse(messages);
        this.messages = parsedMessages;
      }
      
    })
  }

  send(message: string) {
    if(this.username) {
      this.messages.push({
        username: this.username,
        dateTime: new Date(),
        content: message
      });
      localStorage.setItem('messages', JSON.stringify(this.messages));
    }
  }

  login() {
    this.loggedIn = true;
    /* this.interval.subscribe(() => {
      this.getDadJoke();
    }) */
  }

  getDadJoke() {
    /* this.http.get<DadJoke>('https://icanhazdadjoke.com/', {headers : {Accept : 'application/json'}})
      .subscribe(dadMessage => {
        let message : Message = {
          username: 'Dad',
          content: dadMessage.joke
        }
        this.messages.push(message)
      }) */
  }

}
