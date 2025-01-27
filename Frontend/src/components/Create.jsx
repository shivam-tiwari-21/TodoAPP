import React, { useState } from 'react';

const Create = ({ addTask }) => {
    const [task, setTask] = useState("");

    const handleAdd = () => {
        if (task.trim() === "") {
            alert("Task cannot be empty!");
            return;
        }
        addTask(task); // Call the `addTask` function passed as a prop
        setTask(""); // Clear the input field
    };

    return (
        <>
            <div className='create_form'>
                <input
                    type="text"
                    placeholder="Enter Tasks"
                    value={task}
                    onChange={(e) => setTask(e.target.value)}
                />
                <button onClick={handleAdd}>Add</button>
            </div>
        </>
    );
};

export default Create;
