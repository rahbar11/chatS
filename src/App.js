import {useState, useEffect} from "react"
import io from 'socket.io-client';

import Particle from './Components/Particle/Particle';
import Home from './Components/Home/Home';
import Error from "./Components/Error/Error";
import Chat from "./Components/Chat/Chat";

import './App.css';

const socket = io('http://localhost:3001')

function App() {
  const [currentRoom, setCurrentRoom] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  useEffect(()=>{
    socket.on('connect_error', ()=>{
      setTimeout(()=>socket.connect(),5000)
    })
    socket.on("joined", ({room}) => {
      setCurrentRoom(room)
    })
    socket.on("error", ({error}) => {
      setError(error)
      setTimeout(() => setError(""), 5000)
    })
    return () => {
      socket.off('connect_error');
      socket.off('joined')
      socket.off('error')
    }
  },[])


  return (
    <div className="App">
      {error && <Error error={error} />}
      <header className="App-header">
        {!currentRoom ? 
          <>
            <Particle />
            <Home socket={socket} password={password} setPassword={setPassword} />
          </>
          : 
          <Chat currentRoom={currentRoom} setCurrentRoom={setCurrentRoom} socket={socket} setError={setError} password={password}/>
        }
      </header>
    </div>
  );
}

export default App;
