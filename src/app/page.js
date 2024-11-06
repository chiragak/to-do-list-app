'use client';

import { useState } from 'react';
import AddTaskForm from './components/AddTaskForm';
import Task from './components/Task';
import ClearAllButton from './components/ClearAllButton';

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

  const clearTasks = () => {
    setTasks([]);
  };

  return (
    <div className="flex flex-col h-screen items-center justify-center">
      <div 
        className="bg-white  px-48 py-12 w-[1000px] h-[670px] rounded-[32px]"
        style={{ boxShadow: '0px 0px 4px 0px #00174726' }} 
      >
        <h1 className="text-5xl font-semibold mb-4 font-sans text-primary-dark my-10">
          Daily To Do List
        </h1>

        <AddTaskForm onAddTask={addTask} />
        
        <div className="mt-4 space-y-4">
          {tasks.map((task) => (
            <Task key={task.id} task={task} onMarkCompleted={markCompleted} />
          ))}
        </div>
        
        <div className="mt-6">
          <ClearAllButton onClearTasks={clearTasks} />
        </div>
      </div>
    </div>
  );
}
