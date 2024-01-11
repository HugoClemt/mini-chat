import { FormsModule } from '@angular/forms';
import { Component, EventEmitter, Output } from '@angular/core';

@Component({
    selector : "send-message",
    standalone : true,
    imports : [
        FormsModule
    ],
    template : `
    <header class="bg-slate-200 p-4 flex gap-2 items-center">
      <input class="rounded border-slate-200 p-2" type="text" [(ngModel)]="message"/>
      <svg class="cursor-pointer" (click)="_send()" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="currentColor" d="M2.01 21L23 12L2.01 3L2 10l15 2l-15 2z"/></svg>
    </header>`
})

export class SendMessageComponent {

    message = '';

    @Output()
    send = new EventEmitter<string>();

    protected _send(){
        this.send.emit(this.message);
        this.message = '';
    }
}