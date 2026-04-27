import React, { useState } from "react"; 
import "./App.css"; 
 
 function ReminderApp() { 
    const [tasks, setTasks] = useState([ ]); 
    const [form, setForm] = useState({ 
        name: "", 
        dueDate: "", 
        description: "" 
    }); 
    const [filter, setFilter] = useState("all"); 
 
    const handleChange = (e) => { 
        const { name, value } = e.target; 
        setForm({ ...form, [name]: value }); 
    } 
 
    const addTask = (e) => { 
        e.preventDefault(); 
        if (!form.name || !form.dueDate) return; 
 
        //Create a new task object using   form data + id + status 
        const newTask = { 
            id: Date.now(), 
            ...form,completed: false 
        }; 
 
        setTasks([...tasks, newTask]); 
        setForm({ name: "", dueDate: "", description: "" }); 
    } 
 
    const toggleComplete = (id) => { 
        setTasks( 
            tasks.map((task) => 
                task.id === id ? { ...task, completed: !task.completed } : task 
            ) 
        ); 
    }; 
/filteredTasks is an array and code filterr tasks based on whether user selected All / 
Completed / Pending. 
    const filteredTasks = tasks.filter((task) => { 
        if (filter === "completed") return task.completed; 
        if (filter === "pending") return !task.completed; 
        return true; 
    }) 
 
    return ( 
        <div className="container"> 
            <h1>Reminder App</h1> 
 
            <form onSubmit={addTask}> 
                <input 
                    type="text" 
                    name="name" 
                    placeholder="Task Name" 
                    value={form.name} 
                    onChange={handleChange} 
                /> 
 
                <input 
                    type="date" 
                    name="dueDate" 
                    value={form.dueDate} 
                    onChange={handleChange} 
                /> 
 
                <textarea 
                    name="description" 
                    placeholder="Description (optional)" 
                   value={form.description} 
                    onChange={handleChange} 
                /> 
 
                <button type="submit">Add Task</button> 
            </form> 
 
            <div className="filters"> 
                <button onClick={() => setFilter("all")}>All</button> 
                <button onClick={() => setFilter("completed")}>Completed</button> 
                <button onClick={() => setFilter("pending")}>Pending</button> 
            </div> 
 
            <ul> 
                {filteredTasks.map(task => ( 
                    <li > 
                        <div> 
                            <h3>{task.name}</h3> 
                            <p>Due: {task.dueDate}</p> 
                            {task.description && <p>{task.description}</p>} 
                        </div> 
 
                        <button onClick={() => toggleComplete(task.id)}> 
                            {task.completed ? "Completed" : "Pending"} 
                        </button> 
                    </li> 
                ))} 
            </ul> 
        </div> 
    ); 
} 
export default ReminderApp;
