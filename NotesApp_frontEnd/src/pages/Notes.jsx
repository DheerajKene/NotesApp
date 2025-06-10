import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { Navigate } from 'react-router-dom';


const Notes = () => {
    const[notes, setNotes] = useState([]);

    const fetchNotes = async ()=>{
        const token = localStorage.getItem("token");
        // console.log(token)
        try {
        const responce = await fetch("https://notesapp-ytyd.onrender.com/note/notes", {
            headers:{
                Authorization:`Bearer ${token}`
            }
        });
        
        const data = await responce.json();
        setNotes(data)
        
    } catch (error) {
        alert(`An error occured ${error}`);
    }
    }

    useEffect(()=>{
        fetchNotes();
    },[])

    
    // console.log(token);
   
   const handleDelete = async (id)=>{
        const token = localStorage.getItem("token");
        
        try {
            await fetch(`https://notesapp-ytyd.onrender.com/note/delete/${id}`,{
                method:"DELETE",
                headers:{
                    Authorization:`Bearer ${token}`
                }
            });
            alert(`Note deleted successfully...`)
            fetchNotes();
        } catch (error) {
            alert(`Error occured...${error}`)
        }
        
   }


   const handleUpdate = async (id)=>{
    const token = localStorage.getItem("token");
     
    try {
        const note = fetch(`https://notesapp-ytyd.onrender.com/note/delete/${id}`,{
            method:"PATCH",
            headers:{
                Authorization:`Bearer ${token}`
            }
        });

        alert("Note Updated Successfully...");
        fetchNotes();
    } catch (error) {
        alert(`error occured ${error}`);
    } 
   }

  return (
    <>
        <h3>Welcome to the note page</h3>
        
        <br />
        <div>
            {notes.map((note)=>{
                return <>
                    <h2>{note.title}</h2>
                    <h3>{note.description}</h3>
                    <h3>{note.status}</h3>
                    <button onClick={()=>handleDelete(note._id)}>Delete Note</button>
                    <button onClick={()=>handleUpdate(note._id)}>Update Note</button>
                </>
            })}
        </div>
    </>
    
  )
}

export default Notes