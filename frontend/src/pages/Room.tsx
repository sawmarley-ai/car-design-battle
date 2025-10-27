import React, {useEffect, useState} from 'react';
import { useParams, useLocation } from 'react-router-dom';
import io, { Socket } from 'socket.io-client';
import DesignerCanvas from '../components/DesignerCanvas';
import Chat from '../components/Chat';
import VideoStream from '../components/VideoStream';

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || 'http://localhost:4000';
let socket: Socket;

export default function Room(): JSX.Element {
  const { id } = useParams();
  const location = useLocation();
  const username = (location.state as any)?.username || 'guest'+Math.floor(Math.random()*1000);
  const [messages, setMessages] = useState<any[]>([]);

  useEffect(()=>{
    socket = io(SOCKET_URL);
    socket.emit('joinRoom', { roomId: id, username });
    socket.on('systemMessage', (m: any)=> setMessages(ms=>[...ms, {system: true, msg:m.msg}]));
    socket.on('chat:message', (m: any)=> setMessages(ms=>[...ms,m]));
    return ()=> socket.disconnect();
  },[]);

  const sendChat = (text: string)=>{
    socket.emit('chat:message', { roomId: id, message: text });
  }

  return (
    <div style={{display:'grid', gridTemplateColumns:'2fr 1fr', gap:10, padding:10}}>
      <div>
        <DesignerCanvas socket={socket} roomId={id as string} username={username} />
      </div>
      <div>
        <VideoStream socket={socket} roomId={id as string} username={username} />
        <Chat messages={messages} onSend={sendChat} />
      </div>
    </div>
  )
}
