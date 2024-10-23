import { Component, OnInit } from '@angular/core';
import { VideoCallComponent } from '../../components/video-call/video-call.component';
import { WebSocketService } from '../../services/web-socket.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [VideoCallComponent, ReactiveFormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  localStream?: MediaStream;
  remoteStream?: MediaStream;
  isStarted: boolean = false;
  messages: string[] = [];

  sendMessageForm = new FormGroup({
    content: new FormControl('', Validators.required),
  });

  constructor(private webSocketService: WebSocketService) {
    webSocketService.getMessages().subscribe((message) => {
      this.handleMessage(message);
    });
  }

  ngOnInit(): void {
    this.initLocalStream();
  }

  initLocalStream() {
    navigator.mediaDevices.getUserMedia({ video: true, audio: false}).then((stream) => {
      this.localStream = stream;

    }).catch((error) => {
      console.log(error);
    })
  }

  async onStart() {
    if (!this.localStream) {
      try {
        this.localStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false});
        this.isStarted = true;
      } catch (error) {
        console.error('Không thể cấp quyền truy cập:', error);
      }
    } else {
      this.remoteStream = this.localStream;
      this.isStarted = true;
    }
  }

  async onStop() {
    this.isStarted = false;
    this.remoteStream = undefined;
  }

  private handleMessage(message: any) {
    this.messages.push(message);
  }

  onSendMessage() {
    if (this.sendMessageForm.valid) {
      this.webSocketService.sendMessage(this.sendMessageForm.get('content'));
    }
  }

}
