import React, {useEffect, useRef, useState} from 'react';
import { Socket } from 'socket.io-client';

export default function VideoStream({ socket, roomId, username }: { socket: Socket; roomId: string; username: string; }): JSX.Element {
  const localRef = useRef<HTMLVideoElement | null>(null);
  const [streaming, setStreaming] = useState(false);

  useEffect(()=>{
    if(!socket) return;
    socket.on('webrtc:signal', ({ from, data }: any)=> {
      // placeholder for signaling logic
    });
  },[socket]);

  const startStream = async ()=>{
    const s = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
    if(localRef.current) localRef.current.srcObject = s;
    setStreaming(true);
    // In MVP we rely on P2P WebRTC. Full signaling implementation required for multi-viewers.
  }

  return (
    <div>
      <video ref={localRef} autoPlay muted playsInline style={{width:'100%'}} />
      <button onClick={startStream}>{streaming? 'بث يعمل' : 'ابدأ البث (5 دقائق)'}</button>
      <div id="countdown">05:00</div>
    </div>
  )
}
