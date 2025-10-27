import React, {useState} from 'react';

export default function Chat({ messages = [], onSend }: { messages?: any[]; onSend: (text: string)=>void; }): JSX.Element {
  const [text, setText] = useState('');
  return (
    <div>
      <div style={{height:300, overflow:'auto', border:'1px solid #ddd', padding:8}}>
        {messages.map((m,i)=> (
          <div key={i}>{m.system? m.msg : `${m.from}: ${m.message}`}</div>
        ))}
      </div>
      <input value={text} onChange={e=>setText(e.target.value)} placeholder='اكتب رسالة' />
      <button onClick={()=>{ onSend(text); setText(''); }}>أرسل</button>
    </div>
  )
}
