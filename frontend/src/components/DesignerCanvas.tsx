import React, { useRef, useEffect, useState } from 'react';
import { Socket } from 'socket.io-client';

type Part = { img?: HTMLImageElement; x: number; y: number; w: number; h: number; };

export default function DesignerCanvas({ socket, roomId, username }: { socket: Socket; roomId: string; username: string; }): JSX.Element {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [parts, setParts] = useState<Part[]>([]);

  useEffect(()=>{
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext('2d')!;
    canvas.width = 800; canvas.height = 450;
    const render = ()=>{
      ctx.clearRect(0,0,canvas.width,canvas.height);
      ctx.fillStyle = '#111'; ctx.fillRect(0,0,canvas.width,canvas.height);
      parts.forEach(p=>{
        if(p.img) ctx.drawImage(p.img, p.x, p.y, p.w, p.h);
        else { ctx.fillStyle='#666'; ctx.fillRect(p.x,p.y,p.w,p.h); }
      });
    }
    const id = setInterval(render, 1000/30);
    return ()=> clearInterval(id);
  },[parts]);

  const sendDesign = ()=>{
    socket.emit('designer:update', { roomId, design: { parts } });
  }

  return (
    <div>
      <canvas ref={canvasRef} style={{border:'1px solid #333', width:'100%'}} />
      <div style={{marginTop:8}}>
        <button onClick={sendDesign}>أرسل التصميم للجميع</button>
      </div>
    </div>
  )
}
