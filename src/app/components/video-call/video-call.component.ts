import { Component, effect, ElementRef, input, ViewChild, ViewChildren } from '@angular/core';

@Component({
  selector: 'app-video-call',
  standalone: true,
  imports: [],
  templateUrl: './video-call.component.html',
  styleUrl: './video-call.component.css'
})
export class VideoCallComponent {
  @ViewChild('localVideo') localVideoRef?: ElementRef;
  @ViewChild('remoteVideo') remoteVIdeoRef?: ElementRef;

  localStreamInput = input<MediaStream>();

  constructor() {
    effect(() => {
      const localStream = this.localStreamInput();
      if (this.localVideoRef && localStream) {
        this.localVideoRef.nativeElement.srcObject = localStream;
      }
    });
  }
}
