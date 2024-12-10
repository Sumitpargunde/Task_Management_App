import React, { useState, useEffect } from "react";
import TaskTable from "./components/TaskTable";
import AddTaskForm from "./components/AddTaskForm";
import "tailwindcss/tailwind.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

const App = () => {
  const [tasks, setTasks] = useState([]);

  // Add a task
  const addTask = (task) => {
    // Get the next available task ID
    const nextId = tasks.length ? Math.max(...tasks.map(t => t.id)) + 1 : 1;

    // New task with incremental ID
    const newTask = { ...task, id: nextId };

    // Update tasks state and localStorage
    const updatedTasks = [...tasks, newTask];
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    toast.success("Task added successfully!");
  };

  // Update a task
  const updateTask = (updatedTask) => {
    const updatedTasks = tasks.map((task) => (task.id === updatedTask.id ? updatedTask : task));
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    toast.info("Task updated!");
  };

  // Delete a task
  const deleteTask = (id) => {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    toast.error("Task deleted!");
  };

  // Fetch initial tasks from localStorage or API
  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks"));
    
    if (storedTasks) {
      // If there are stored tasks in localStorage, load them
      setTasks(storedTasks);
    } else {
      // Fetch tasks from the API if no tasks in localStorage
      fetch("https://jsonplaceholder.typicode.com/todos")
        .then((response) => response.json())
        .then((data) => {
          const mappedTasks = data.slice(0, 20).map((task) => ({
            id: task.id,
            title: task.title,
            description: `Description of Task ${task.id}`,
            status: task.completed ? "Done" : "To Do",
          }));
          setTasks(mappedTasks);
          localStorage.setItem("tasks", JSON.stringify(mappedTasks)); // Persist initial tasks
        });
    }
  }, []);

  return (
    <div className="sumit bg-gray-100 min-h-screen p-4">
      <div className="container mx-auto bg-white rounded shadow p-6">
        <h1 className="text-3xl font-bold text-center mb-6">Task List Manager</h1>
        
        {/* Add Task Form */}
        <div className="mb-6">
          <AddTaskForm addTask={addTask} />
        </div>
        
        {/* Task Table */}
        <TaskTable tasks={tasks} updateTask={updateTask} deleteTask={deleteTask} />

        {/* Toast Notifications */}
        <ToastContainer />
      </div>
    </div>
  );
};

export default App;
