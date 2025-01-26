import React, { useState } from 'react';
import axious from "axios";

const Create = () => {

    const [task,setTask]=useState();
    const handleAdd= () => {
        axious.post("http://localhost:3000/add", {task:task})
        .then(result=>console.log(result))
        .catch(err=>console.log(err))
    }

  return (
   <>
   <div className='create_form'>
    <input type="text"placeholder= "Enter Tasks" onChange={(e)=>setTask(e.target.value)} />
    <button onClick={handleAdd} >Add</button>
   </div>
   </>
  )
}

export default Create