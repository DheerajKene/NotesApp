import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
// import fetch from 'node-fetch'


const Register = () => {
    const navigate = useNavigate()
    const[name, setName] = useState("");
    const[email, setEmail] = useState("");
    const[password, setPassword] = useState("");
    const[gender, setGender] = useState("");
    const[age, setAge] = useState("");

    const HandleSubmit = async()=>{
        const payload = {
            name,
            email,
            password,
            gender,
            age
        }
        console.log(payload);

        try {
            await fetch("https://notesapp-ytyd.onrender.com/user/register", {
                method:"POST",
                headers:{
                    "Content-type":"application/json"
                },
                body: JSON.stringify(payload)
            });

            alert(`User Registered Successfully...`);
            navigate("/Login");

        } catch (error) {
            alert(`An error occured ${error}`);
        }
    }

  return (
    <>
        <div>Welcome to the Register page</div><br/>
        <label>Name : </label>
        <input type="text" placeholder='Enter Name' value={name} onChange={(e)=>setName(e.target.value)} /><br/>
        <label htmlFor="">Email : </label>
        <input type="text" placeholder='Enter Email' value={email} onChange={(e)=>setEmail(e.target.value)} /><br/>
        <label htmlFor="">Password : </label>
        <input type="text" placeholder='Enter Password' value={password} onChange={(e)=>setPassword(e.target.value)} /><br/>
        <label>Gender : </label>
        <input type="text" placeholder='Enter gender' value={gender} onChange={(e)=>setGender(e.target.value)} /><br/>
        <label htmlFor="">Age : </label>
        <input type="text" placeholder='Enter Age' value={age} onChange={(e)=>setAge(e.target.value)} /><br/>
        <button onClick={HandleSubmit}>Submit</button>
        
    </>
    

  )
}

export default Register