import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const[email, setEmail] = useState('');
    const[password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async ()=>{
        const payload = {
            email,
            password
        }

        try {
            const responce = await fetch("https://notesapp-ytyd.onrender.com/user/login", {
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify(payload)
            });
            const data = await responce.json();
            console.log(data);
            if(data.token){
                localStorage.setItem("token", data.token)
                alert(`${data.message}`);
                navigate('/Notes')
            }

            
        } catch (error) {
            alert(`An error occured ${error}`);
        }
    }
  return (
    <>
        <div>Welcome to the Login page</div>
        <br />
        <input type="text" placeholder='Enter email' value={email} onChange={(e)=>setEmail(e.target.value)} />
        <input type="text" placeholder='Enter password' value={password} onChange={(e)=>setPassword(e.target.value)} />
        <br />
        <button onClick={handleSubmit}>Submit</button>
    </>
    
  )
}

export default Login