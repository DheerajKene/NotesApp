import React from 'react'
import { useNavigate } from 'react-router-dom'

const Home = () => {
    const navigate = useNavigate();
  return (
    <>
        <div>Welcome to the notes application</div>
        <br />
        <h1>Notes</h1>
        <h2>You can proceed with Registration process</h2>
        <button onClick={()=>navigate('/Register')}>Click to Register</button>
        <button onClick={()=>{navigate("/Login")}}>Alrady registered</button>
    </>
    
    

  )
}

export default Home