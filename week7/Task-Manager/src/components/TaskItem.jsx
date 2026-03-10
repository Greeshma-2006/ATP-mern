import React from "react";

function TaskItem({ task, deleteTask, toggleComplete }) {

  return (
    <div className="bg-white p-4 rounded-lg shadow">

      <img
        src={task.image}
        alt="task"
        className="w-full rounded mb-3"
      />

      <h3 className="text-lg font-semibold">{task.title}</h3>

      <p className="text-sm text-gray-600">
        Brand: {task.brand}
      </p>

      <p className="text-sm text-gray-600">
        {task.description}
      </p>

      <p className="text-sm">
        Price: {task.price}
      </p>

      <p className="text-sm mb-2">
        Priority: {task.priority}
      </p>

      <p className={task.completed ? "text-green-600 font-semibold" : "text-red-500 font-semibold"}>
        {task.completed ? "Completed" : "Pending"}
      </p>

      <div className="flex gap-2 mt-3">

        <button
          className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
          onClick={() => toggleComplete(task.id)}
        >
          Toggle
        </button>

        <button
          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
          onClick={() => deleteTask(task.id)}
        >
          Delete
        </button>

      </div>

    </div>
  );
}

export default TaskItem;