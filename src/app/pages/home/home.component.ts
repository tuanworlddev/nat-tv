import { Component, OnInit } from '@angular/core';
import { VideoCallComponent } from '../../components/video-call/video-call.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [VideoCallComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  
  localStream?: MediaStream;
  isStarted: boolean = false;

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
    if (!this.localStream) return;
    this.isStarted = true;
  }

  async onStop() {
    this.isStarted = false;
  }

}
