import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';

export default function Lobby(): JSX.Element {
  const [username, setUsername] = useState('');
  const navigate = useNavigate();
  const createRoom = () => {
    const id = Math.random().toString(36).slice(2,9);
    navigate(`/room/${id}`, { state: { username } });
  }
  return (
    <div style={{padding:20}}>
      <h1>Car Design Battle</h1>
      <input value={username} onChange={e=>setUsername(e.target.value)} placeholder="اسم المستخدم" />
      <button onClick={createRoom} disabled={!username}>ابدأ تحدي تصميم</button>
    </div>
  )
}
