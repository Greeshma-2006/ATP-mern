import React from "react";
import TaskManager from "./components/TakManager";

function App() {
  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-start p-10">
      <div className="w-full max-w-3xl bg-white shadow-lg rounded-xl p-8">
        <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6">
          Task Manager
        </h1>

        <TaskManager />
      </div>
    </div>
  );
}

export default App;