import React,{useEffect, useState} from 'react';
import Create from './Create';
import axios from 'axios';

const Home = () => {

    const [todos, setTodos]=useState([]);
    useEffect(()=>{
        axios.get("http://localhost:3000/get")
        .then( result => setTodos(result.data))
        .catch(err=> console.log(err))
    },[])
  return (
    <>
    <div className='home'>
        <h2>Todo App</h2>
        <Create/>
        <div>
            { todos.length===0?
                <div><h2>No Data Found</h2></div> 
            :
            todos.map(todo =>(
                <div>
                    {todo.task}
                </div>
            ))}
        </div>
    </div>
    </>
  )
}

export default Home