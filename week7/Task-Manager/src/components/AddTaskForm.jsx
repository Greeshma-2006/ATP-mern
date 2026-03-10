import React, { useState } from "react";

function AddTaskForm({ addTask }) {

  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (title.trim().length < 3) {
      setError("Title must be at least 3 characters");
      return;
    }

    const newTask = {
      id: Date.now(),
      title,
      priority,
      completed: false,
      image: "https://picsum.photos/200",
      brand: "Task Brand",
      description: "Simple task item",
      price: "Free"
    };

    addTask(newTask);

    setTitle("");
    setPriority("");
    setError("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-gray-50 p-5 rounded-lg shadow mb-6"
    >

      <input
        type="text"
        placeholder="Task Title"
        className="w-full border p-2 rounded mb-3"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <input
        type="text"
        placeholder="Priority"
        className="w-full border p-2 rounded mb-3"
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
      />

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Add Task
      </button>

      {error && <p className="text-red-500 mt-2">{error}</p>}

    </form>
  );
}

export default AddTaskForm;