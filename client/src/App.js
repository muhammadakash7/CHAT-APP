import React from 'react'
// import './App.css';
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Chat from './pages/Chat'
import Login from './pages/Login'
import Register from './pages/register'
import SetAvatar from './components/SetAvatar'
// import Messages from './components/Messages'
export default function App() {
  return (
    <>
    {/* <div>
      <h1>helo chat app</h1>
    </div> */}
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Chat/>}/> 
      <Route path='/register' element={<Register/>}/>  
      <Route path='/login' element={<Login/>}/>  
      <Route path='/setavatar' element={<SetAvatar/>}/>  
      {/* <Route path='/message' element={<Messages/>}/>   */}
    </Routes>
    </BrowserRouter>
    </>

  )
}
