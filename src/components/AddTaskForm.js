import React, { useState } from "react";
//import { motion } from "framer-motion";

const AddTaskForm = ({ addTask }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("To Do");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title && description) {
      addTask({
        id: Date.now(),
        title,
        description,
        status,
      });
      setTitle("");
      setDescription("");
      setStatus("To Do");
    }
  };

  return (

    <form
      onSubmit={handleSubmit}
      className="bg-white shadow-lg rounded-lg p-4 mb-4 animate-fadeIn shadow-md hover:shadow-lg transition-shadow "
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border border-gray-300 rounded p-2 focus:ring-2 focus:ring-blue-500"
          required
        />
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border border-gray-300 rounded p-2 focus:ring-2 focus:ring-blue-500"
          required
        />
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="border border-gray-300 rounded p-2 focus:ring-2 focus:ring-blue-500"
        >
          <option>To Do</option>
          <option>In Progress</option>
          <option>Done</option>
        </select>
      </div>
      
      <div className="center-container">
      <button
        type="submit"
        className="add-task-button mt-4 bg-blue-500 hover:bg-blue-600 te transition-transform transform hover:scale-105 hover:bg-blue-600"
      >
        Add Task
      </button>
      </div>
    </form>
   
  );
};

export default AddTaskForm;
