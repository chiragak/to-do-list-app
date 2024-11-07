'use client';
import { useState, useEffect } from 'react';
import AddTaskForm from './components/AddTaskForm';
import ThemeToggle from './components/ThemeToggle';
import Task from './components/Task';

export default function TodoApp() {
  const [tasks, setTasks] = useState(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setTasks([]);
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const addTask = (taskText) => {
    if (!taskText.trim()) return;
    setTasks(prevTasks => [...prevTasks, {
      id: `task-${Date.now()}`,
      text: taskText,
      completed: false,
      createdAt: new Date().toISOString()
    }]);
  };

  const markCompleted = (id) => {
    setTasks(prevTasks =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const clearAllTasks = () => {
    setTasks([]);
  };

  if (tasks === null) {
    return null;
  }

  return (
    <main className="flex flex-col min-h-screen items-center justify-center p-4 md:p-6 bg-[#F5F9FF] dark:bg-[#1a1a1a]">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>
      
      <div 
        className="bg-white dark:bg-[#212121] w-full max-w-[1000px] min-h-[480px] md:min-h-[670px] 
                   rounded-lg md:rounded-[32px] relative px-4 py-8 md:px-48 md:py-12 
                   shadow-[0px_0px_4px_0px_#00174726] dark:shadow-[0px_0px_4px_0px_#ffffff26]"
      >
        <h1 className="text-3xl md:text-5xl font-semibold mb-6 md:mb-10 font-rubik text-[#1a1a1a] dark:text-white md:my-10">
          Daily To Do List
        </h1>

        <AddTaskForm onAddTask={addTask} />

        <div className="mt-4 space-y-4 mb-24">
          {tasks.map((task) => (
            <Task 
              key={task.id} 
              task={task} 
              onMarkCompleted={markCompleted} 
            />
          ))}
        </div>

        <div className="absolute bottom-20 left-4 right-4 md:left-48 md:right-48 border-t border-[#B1BACB] dark:border-gray-700" />

        <div className="absolute bottom-8 left-4 right-4 md:left-48 md:right-48 flex justify-between items-center">
          <span className="text-gray-400 dark:text-gray-400">
            {tasks.length} {tasks.length === 1 ? 'item' : 'items'}
          </span>
          <button
            onClick={clearAllTasks}
            className="hover:underline transition text-gray-400 dark:text-gray-400"
          >
            Clear All
          </button>
        </div>
      </div>
    </main>
  );
}