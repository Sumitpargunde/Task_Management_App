import React, { useState } from "react";

const TaskTable = ({ tasks, updateTask, deleteTask }) => {
  const [idFilter, setIdFilter] = useState(""); // For ID filter
  const [titleFilter, setTitleFilter] = useState(""); // For Title filter
  const [descriptionFilter, setDescriptionFilter] = useState(""); // For Description filter
  const [statusFilter, setStatusFilter] = useState("All"); // For Status filter

  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editedTask, setEditedTask] = useState({
    title: "",
    description: "",
    status: "To Do",
  });

  // Filter tasks based on ID, Title, Description, and Status
  const filteredTasks = tasks.filter((task) => {
    const idMatch = task.id.toString().includes(idFilter);
    const titleMatch = task.title.toLowerCase().includes(titleFilter.toLowerCase());
    const descriptionMatch = task.description.toLowerCase().includes(descriptionFilter.toLowerCase());
    const statusMatch = statusFilter === "All" || task.status === statusFilter;
    return idMatch && titleMatch && descriptionMatch && statusMatch;
  });

  // Handle task edit
  const handleEditClick = (task) => {
    setEditingTaskId(task.id);
    setEditedTask({
      title: task.title,
      description: task.description,
      status: task.status,
    });
  };

  const handleSaveClick = () => {
    updateTask({ ...editedTask, id: editingTaskId });
    setEditingTaskId(null); // Close the edit form
  };

  const handleCancelClick = () => {
    setEditingTaskId(null); // Close the edit form
  };

  return (
    <div className="overflow-x-auto">
      {/* Filters */}
      <div className="flex justify-between mb-4">
        {/* ID Filter */}
        <input
          type="text"
          placeholder="Filter by ID"
          value={idFilter}
          onChange={(e) => setIdFilter(e.target.value)}
          className="p-2 border rounded"
        />

        {/* Title Filter */}
        <input
          type="text"
          placeholder="Filter by Title"
          value={titleFilter}
          onChange={(e) => setTitleFilter(e.target.value)}
          className="p-2 border rounded"
        />

        {/* Description Filter */}
        <input
          type="text"
          placeholder="Filter by Description"
          value={descriptionFilter}
          onChange={(e) => setDescriptionFilter(e.target.value)}
          className="p-2 border rounded"
        />

        {/* Status Filter */}
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="p-2 border rounded"
        >
          <option value="All">All Status</option>
          <option value="To Do">To Do</option>
          <option value="In Progress">In Progress</option>
          <option value="Done">Done</option>
        </select>
      </div>

      {/* Table */}
      <table className="table-auto w-full border-collapse">
        <thead>
          <tr className="bg-gray-200">
            <th className="border px-4 py-2">ID</th>
            <th className="border px-4 py-2">Title</th>
            <th className="border px-4 py-2">Description</th>
            <th className="border px-4 py-2">Status</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredTasks.map((task) => (
            <tr key={task.id}>
              <td className="border px-4 py-2">{task.id}</td>
              
              {/* Title (Editable) */}
              <td className="border px-4 py-2">
                {editingTaskId === task.id ? (
                  <input
                    type="text"
                    value={editedTask.title}
                    onChange={(e) => setEditedTask({ ...editedTask, title: e.target.value })}
                    className="p-2 border rounded"
                  />
                ) : (
                  task.title
                )}
              </td>

              {/* Description (Editable) */}
              <td className="border px-4 py-2">
                {editingTaskId === task.id ? (
                  <input
                    type="text"
                    value={editedTask.description}
                    onChange={(e) => setEditedTask({ ...editedTask, description: e.target.value })}
                    className="p-2 border rounded"
                  />
                ) : (
                  task.description
                )}
              </td>

              {/* Status (Editable) */}
              <td className="border px-4 py-2">
                {editingTaskId === task.id ? (
                  <select
                    value={editedTask.status}
                    onChange={(e) => setEditedTask({ ...editedTask, status: e.target.value })}
                    className="p-2 border rounded"
                  >
                    <option value="To Do">To Do</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Done">Done</option>
                  </select>
                ) : (
                  task.status
                )}
              </td>

              {/* Actions */}
              <td className="border px-4 py-2">
                {editingTaskId === task.id ? (
                  <>
                    <button
                      onClick={handleSaveClick}
                      className="bg-green-500 text-white px-2 py-1 rounded mr-2"
                    >
                      Save
                    </button>
                    <button
                      onClick={handleCancelClick}
                      className="bg-red-500 text-white px-2 py-1 rounded"
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => handleEditClick(task)}
                      className="bg-blue-500 text-white px-2 py-1 rounded"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteTask(task.id)}
                      className="bg-red-500 text-white px-2 py-1 rounded ml-2"
                    >
                      Delete
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TaskTable;
