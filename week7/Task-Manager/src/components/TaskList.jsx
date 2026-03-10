import React from "react";
import TaskItem from "./TaskItem";

function TaskList({ tasks, deleteTask, toggleComplete }) {

  if (tasks.length === 0) {
    return (
      <p className="text-center text-gray-500">
        No tasks added yet
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
      {tasks.map(task => (
        <TaskItem
          key={task.id}
          task={task}
          deleteTask={deleteTask}
          toggleComplete={toggleComplete}
        />
      ))}
    </div>
  );
}

export default TaskList;