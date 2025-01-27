import React, { useEffect, useState } from 'react';
import Create from './Create';
import axios from 'axios';
import { BsCircle, BsCircleFill, BsTrash3 } from "react-icons/bs";

const Home = () => {
    const [todos, setTodos] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:3000/get")
            .then((result) => setTodos(result.data))
            .catch((err) => console.log(err));
    }, []);

    const handleEdit = (id) => {
        axios.put("http://localhost:3000/update/" + id)
            .then(() => {
                setTodos((prevTodos) =>
                    prevTodos.map((todo) =>
                        todo._id === id ? { ...todo, done: !todo.done } : todo
                    )
                );
            })
            .catch((err) => console.log(err));
    };

    const addTask = (newTask) => {
        axios.post("http://localhost:3000/add", { task: newTask })
            .then((result) => {
                setTodos((prevTodos) => [...prevTodos, result.data]);
            })
            .catch((err) => console.log(err));
    };

    const handleDelete = (id) => {
        axios.delete("http://localhost:3000/delete/" + id)
            .then(() => {
                setTodos((prevTodos) => prevTodos.filter((todo) => todo._id !== id));
            })
            .catch((err) => console.log(err));
    };

    return (
        <>
            <div className='home'>
                <h2>Todo App</h2>
                <Create addTask={addTask} />
                <div>
                    {todos.length === 0 ? (
                        <div><h2>No Data Found</h2></div>
                    ) : (
                        todos.map((todo) => (
                            <div className='task' key={todo._id}>
                                <div className='checkbox' onClick={() => handleEdit(todo._id)}>
                                    {todo.done ? <BsCircleFill className='icon' /> : <BsCircle className='icon' />}
                                </div>
                                <p className={todo.done ? "line_through" : ""}>{todo.task}</p>
                                <div>
                                    <span onClick={() => handleDelete(todo._id)}>
                                        <BsTrash3 className='icon' />
                                    </span>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </>
    );
};

export default Home;
