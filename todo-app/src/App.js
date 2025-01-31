import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  // Fetch tasks from the backend
  useEffect(() => {
    axios.get("http://127.0.0.1:5000/tasks").then((response) => {
      setTasks(response.data);
    });
  }, []);

  // Add a new task
  const addTask = () => {
    if (newTask.trim()) {
      axios.post("http://127.0.0.1:5000/tasks", { task: newTask }).then(() => {
        setTasks([...tasks, { id: tasks.length + 1, task: newTask }]);
        setNewTask("");
      });
    }
  };

  // Delete a task
  const deleteTask = (taskId) => {
    axios.delete(`http://127.0.0.1:5000/tasks/${taskId}`).then(() => {
      setTasks(tasks.filter((task) => task.id !== taskId));
    });
  };

  return (
    <div className="App">
      <h1>To-Do List</h1>
      <input
        type="text"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        placeholder="Add a task"
      />
      <button onClick={addTask}>Add</button>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            {task.task} <button onClick={() => deleteTask(task.id)}>❌</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
