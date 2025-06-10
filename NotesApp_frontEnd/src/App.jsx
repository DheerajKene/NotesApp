import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/home'
import Register from './pages/Register'
import Login from './pages/Login'
import Notes from './pages/Notes'

import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/Login' element={<Login/>}/>
      <Route path='/Register' element={<Register/>}/>
      <Route path='/Notes' element={<Notes/>}/>
    </Routes>
    </>
  )
}

export default App
