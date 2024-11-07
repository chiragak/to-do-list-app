"use client";

import React, { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import confetti from 'canvas-confetti';
import AddTaskForm from './components/AddTaskForm';
import ThemeToggle from './components/ThemeToggle';
import Task from './components/Task';
import { Trash2, ArrowUpDown, Filter } from 'lucide-react';

export default function TodoApp() {
  const [tasks, setTasks] = useState(null);
  const [mounted, setMounted] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [sortOrder, setSortOrder] = useState('newest');
  const [filter, setFilter] = useState('all');
  const [showMessage, setShowMessage] = useState(false); 
  const { theme } = useTheme();

  // Load tasks and preferences from localStorage on mount
  useEffect(() => {
    const savedTasks = localStorage.getItem('tasks');
    const savedSort = localStorage.getItem('sortOrder');
    const savedFilter = localStorage.getItem('filter');
    
    setTasks(savedTasks ? JSON.parse(savedTasks) : []);
    setSortOrder(savedSort || 'newest');
    setFilter(savedFilter || 'all');
    setMounted(true);
  }, []);

  // Save tasks to localStorage whenever they change
  useEffect(() => {
    if (tasks) {
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }
  }, [tasks]);

  // Save preferences whenever they change
  useEffect(() => {
    localStorage.setItem('sortOrder', sortOrder);
  }, [sortOrder]);

  useEffect(() => {
    localStorage.setItem('filter', filter);
  }, [filter]);

  // Trigger confetti and display message when all tasks are completed
  useEffect(() => {
    if (tasks?.length > 0 && tasks.every(task => task.completed)) {
      const colors = theme === 'dark' 
        ? ['#ffffff', '#888888'] 
        : ['#0066ff', '#ff4081'];

      // Confetti from the left side
      confetti({
        particleCount: 200,
        spread: 200,
        origin: { x: 0, y: 0.6 },  // Origin at the left edge
        colors,
        disableForReducedMotion: true
      });

      // Confetti from the right side
      confetti({
        particleCount: 200,
        spread: 200,
        origin: { x: 1, y: 0.6 },  // Origin at the right edge
        colors,
        disableForReducedMotion: true
      });

      // Show the "All tasks complete!" message
      setShowMessage(true);

      // Hide the message after 4 seconds
      setTimeout(() => {
        setShowMessage(false);
      }, 4000);
    }
  }, [tasks, theme]);

  if (!mounted) return null;

  const addTask = (taskText) => {
    if (!taskText.trim()) return;
    setTasks(prevTasks => [{
      id: `task-${Date.now()}`,
      text: taskText,
      completed: false,
      createdAt: new Date().toISOString(),
      important: false
    }, ...prevTasks]);
  };

  const deleteTask = (id) => {
    setTasks(prevTasks => prevTasks.filter(task => task.id !== id));
    setEditingTask(null);
  };

  const editTask = (id, newText) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === id ? { ...task, text: newText } : task
      )
    );
    setEditingTask(null);
  };

  const markCompleted = (id) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const toggleImportant = (id) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === id ? { ...task, important: !task.important } : task
      )
    );
  };

  const clearAllTasks = () => {
    if (window.confirm('Are you sure you want to clear all tasks?')) {
      setTasks([]);
    }
  };

  const getSortedAndFilteredTasks = () => {
    if (!tasks) return [];
    
    let filteredTasks = [...tasks];
    
    switch (filter) {
      case 'active':
        filteredTasks = filteredTasks.filter(task => !task.completed);
        break;
      case 'completed':
        filteredTasks = filteredTasks.filter(task => task.completed);
        break;
    }
    
    switch (sortOrder) {
      case 'oldest':
        filteredTasks.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
        break;
      case 'newest':
        filteredTasks.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
      case 'alphabetical':
        filteredTasks.sort((a, b) => a.text.localeCompare(b.text));
        break;
      case 'important':
        filteredTasks.sort((a, b) => (b.important ? 1 : 0) - (a.important ? 1 : 0));
        break;
    }
    
    return filteredTasks;
  };

  const sortedAndFilteredTasks = getSortedAndFilteredTasks();

  return (
    <main className="flex flex-col min-h-screen items-center justify-center p-4 md:p-6 bg-[#F5F9FF] dark:bg-[#1a1a1a] transition-colors duration-100 ease-in-out">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>
      
      <div className="bg-white dark:bg-[#212121] w-full max-w-4xl min-h-[480px] rounded-lg md:rounded-3xl relative px-4 py-8 md:px-12 md:py-12 shadow-lg transition-colors duration-200 ease-in-out">
        <h1 className="text-3xl md:text-5xl font-bold mb-8 text-[#11175E] dark:text-white transition-colors duration-200 ease-in-out">
          Daily To Do List
        </h1>

        <div className="flex flex-wrap gap-2 mb-4 items-center justify-between">
          <div className="flex gap-2">
            <button
              onClick={() => setSortOrder(prev => {
                const orders = ['newest', 'oldest', 'alphabetical', 'important'];
                const currentIndex = orders.indexOf(prev);
                return orders[(currentIndex + 1) % orders.length];
              })}
              className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-0"
            >
              <ArrowUpDown size={16} />
              <span className="capitalize">{sortOrder}</span>
            </button>
            
            <button
              onClick={() => setFilter(prev => {
                const filters = ['all', 'active', 'completed'];
                const currentIndex = filters.indexOf(prev);
                return filters[(currentIndex + 1) % filters.length];
              })}
              className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-0"
            >
              <Filter size={16} />
              <span className="capitalize">{filter}</span>
            </button>
          </div>
        </div>

        <AddTaskForm onAddTask={addTask} />

        <div className="mt-4 space-y-4 mb-24">
          {sortedAndFilteredTasks.map((task) => (
            <Task 
              key={task.id} 
              task={task} 
              onMarkCompleted={markCompleted}
              onDelete={deleteTask}
              onEdit={editTask}
              onToggleImportant={toggleImportant}
              isEditing={editingTask === task.id}
              setIsEditing={(isEditing) => setEditingTask(isEditing ? task.id : null)}
            />
          ))}
        </div>

        <div className="absolute bottom-20 left-4 right-4 md:left-12 md:right-12 border-t border-gray-200 dark:border-gray-700" />

        <div className="absolute bottom-8 left-4 right-4 md:left-12 md:right-12 flex justify-between items-center">
          <span className="text-gray-400">
            {tasks.length} {tasks.length === 1 ? 'item' : 'items'}
          </span>
          <button
            onClick={clearAllTasks}
            className="flex items-center gap-1 text-red-500 hover:text-red-600 dark:hover:text-red-400 transition-colors"
          >
            <Trash2 size={16} />
            Clear All
          </button>
        </div>
      </div>

      {/* Display a success message when all tasks are completed */}
      {showMessage && (
        <div className="fixed bottom-8 right-8 bg-green-500 text-white text-xl py-2 px-4 rounded-lg shadow-lg">
          All tasks completed! 🎉
        </div>
      )}
    </main>
  );
}