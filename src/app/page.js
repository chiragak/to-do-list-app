'use client';

import { useState } from 'react';
import AddTaskForm from './components/AddTaskForm';
import Task from './components/Task';

export default function Home() {
  const [tasks, setTasks] = useState([]);

  const addTask = (taskText) => {
    setTasks([...tasks, { id: Date.now(), text: taskText, completed: false }]);
  };

  const markCompleted = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const clearAllTasks = () => {
    setTasks([]);
  };

  return (
    <div className="flex flex-col h-screen items-center justify-center">
      <div 
        className="bg-white px-48 py-12 w-[1000px] h-[670px] rounded-[32px] relative"
        style={{ boxShadow: '0px 0px 4px 0px #00174726' }}
      >
        <h1 className="text-5xl font-semibold mb-10 font-rubik text-primary-dark my-10">
          Daily To Do List
        </h1>

        <AddTaskForm onAddTask={addTask} />

        <div className="mt-4 space-y-4">
          {tasks.map((task) => (
            <Task key={task.id} task={task} onMarkCompleted={markCompleted} />
          ))}
        </div>

        {/* Horizontal Line */}
        <div 
          className="absolute bottom-20 left-48 right-48"
          style={{ borderTop: '1px solid #B1BACB' }}
        />

        {/* Footer with Total Items and Clear All */}
        <div className="absolute bottom-8 left-48 right-48 flex justify-between items-center">
          <span style={{ color: '#B1BACB' }}>
            {tasks.length} items
          </span>
          <button
            onClick={clearAllTasks}
            className="hover:underline transition"
            style={{ color: '#B1BACB' }}
          >
            Clear All
          </button>
        </div>
      </div>
    </div>
  );
}