import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { interval } from 'rxjs';
import { SendMessageComponent } from "./send-message.component";

interface Message {
  username: string;
  content: string;
}

interface DadJoke {

  id: string;
  joke: string;
  status: number;
}


@Component({
    selector: 'app-root',
    standalone: true,
    imports: [
      FormsModule,
      SendMessageComponent,
      CommonModule
  ],
    template: `
    @if (loggedIn) { 
      <send-message (send)="send($event)"/>
    } @else {
      <div class="bg-slate-200 p-4 flex gap-2 items-center">
        <input type="text" [(ngModel)]="username"/>
        <button (click)="login()">Connexion</button>
        <!-- <button (click)="getDadJoke()">message</button> -->
      </div>
    }
      @for (item of messages; track $index) { 
        <div class="p-4 bg-slate-200 rounded m-4" [ngClass]="{
          'bg-sky-200' : item.username === username,
          'bg-slate-300' : item.username !== username
        }">
          <p class="font-bold">{{ item.username }}</p>
          <p>{{ item.content }}</p>
        </div>
       }
    `
    
})
export class AppComponent {

  loggedIn = false;

  messages: Message[] = [];

  username = '';

  http = inject(HttpClient);

  send(message: string) {
    if(this.username) {
      this.messages.push({
        username: this.username,
        content: message
      })
    }
  }

  login() {
    this.loggedIn = true;
    this.interval.subscribe(() => {
      this.getDadJoke();
    })
  }

  interval = interval(2000);

  getDadJoke() {
    this.http.get<DadJoke>('https://icanhazdadjoke.com/', {headers : {Accept : 'application/json'}})
      .subscribe(dadMessage => {
        let message : Message = {
          username: 'Dad',
          content: dadMessage.joke
        }
        this.messages.push(message)
      })
  }
}
