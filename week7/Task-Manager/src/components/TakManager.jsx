import React, { useState } from "react";
import AddTaskForm from "./AddTaskForm";
import TaskList from "./TaskList";

function TaskManager() {

  const [tasks, setTasks] = useState([]);

  const addTask = (task) => {
    setTasks([...tasks, task]);
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const toggleComplete = (id) => {
    setTasks(
      tasks.map(task =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const completedCount = tasks.filter(t => t.completed).length;

  return (
    <div>

      <div className="flex justify-center gap-6 mb-6">
        <div className="bg-gray-100 px-4 py-2 rounded-lg shadow">
          Total Tasks: {tasks.length}
        </div>

        <div className="bg-gray-100 px-4 py-2 rounded-lg shadow">
          Completed: {completedCount}
        </div>
      </div>

      <AddTaskForm addTask={addTask} />

      <TaskList
        tasks={tasks}
        deleteTask={deleteTask}
        toggleComplete={toggleComplete}
      />

    </div>
  );
}

export default TaskManager;