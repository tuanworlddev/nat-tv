import { Injectable } from '@angular/core';
import { map, Observable, Subject, takeUntil, timer } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  private ws!: WebSocket;
  private reconnectDelay = 5000;
  private wsUrl = 'ws://localhost:8080/ws';
  private connection$: Subject<MessageEvent> = new Subject<MessageEvent>();

  constructor() {
    //this.connect();
   }

  private connect() {
    this.ws = new WebSocket(this.wsUrl);

    this.ws.onopen = () => {
      console.log('WebSocket connected');
    };

    this.ws.onmessage = (message: MessageEvent) => {
      this.connection$.next(message);
    };

    this.ws.onclose = (event) => {
      console.log('WebSocket closed, reconnecting...');
      this.reconnect();
    };

    this.ws.onerror = (error) => {
      console.log('WebSocket error: ', error);
      this.ws.close();
    };
  }

  private reconnect() {
    const reconnectTimer = timer(this.reconnectDelay);
    reconnectTimer.subscribe(() => {
      this.connect();
    });
  }

  getMessages(): Observable<any> {
    return this.connection$.asObservable().pipe(map((event) => event.data));
  }

  sendMessage(data: any) {
    if (this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(data);
    } else {
      console.log('WebSocket is not open.');
    }
  }
}
