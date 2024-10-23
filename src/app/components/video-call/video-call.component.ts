import { Component, computed, effect, ElementRef, input, Signal, ViewChild } from '@angular/core';
import { explicitEffect } from 'ngxtension/explicit-effect';

@Component({
  selector: 'app-video-call',
  standalone: true,
  imports: [],
  templateUrl: './video-call.component.html',
  styleUrl: './video-call.component.css'
})
export class VideoCallComponent {
  @ViewChild('localVideo') localVideoRef?: ElementRef;
  @ViewChild('remoteVideo') remoteVideoRef?: ElementRef;

  localStreamInput = input<MediaStream>();
  remoteStreamInput = input<MediaStream>();
  isStartedInput = input<boolean>(false);

  constructor() {

    explicitEffect([this.localStreamInput], ([localStream]) => {
      if (this.localVideoRef && localStream) {
        this.localVideoRef.nativeElement.srcObject = localStream;
      }
    });

    explicitEffect([this.remoteStreamInput], ([remoteStream]) => {
      if (this.remoteVideoRef && remoteStream) {
        this.remoteVideoRef.nativeElement.srcObject = remoteStream;
      }
    });

    explicitEffect([this.isStartedInput], ([isStarted]) => {
      if (!isStarted && this.remoteVideoRef?.nativeElement.srcObject) {
        this.remoteVideoRef.nativeElement.srcObject = null;
      }
    });
  }
}
