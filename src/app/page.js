'use client';
import { useState, useEffect } from 'react';
import AddTaskForm from './components/AddTaskForm';
import ThemeToggle from './components/ThemeToggle';
import Task from './components/Task';
import { Trash2, ArrowUpDown, Filter } from 'lucide-react';

export default function TodoApp() {
  const [tasks, setTasks] = useState(null);
  const [mounted, setMounted] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [sortOrder, setSortOrder] = useState('newest');
  const [filter, setFilter] = useState('all'); // 'all', 'active', 'completed'
  const [showConfetti, setShowConfetti] = useState(false);

  // Load tasks from localStorage on mount
  useEffect(() => {
    const savedTasks = localStorage.getItem('tasks');
    setTasks(savedTasks ? JSON.parse(savedTasks) : []);
    setMounted(true);
  }, []);

  // Save tasks to localStorage whenever they change
  useEffect(() => {
    if (tasks) {
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }
  }, [tasks]);

  // Show confetti animation when all tasks are completed
  useEffect(() => {
    if (tasks?.length > 0 && tasks.every(task => task.completed)) {
      setShowConfetti(true);
      const timer = setTimeout(() => setShowConfetti(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [tasks]);

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
    
    // Apply filter
    switch (filter) {
      case 'active':
        filteredTasks = filteredTasks.filter(task => !task.completed);
        break;
      case 'completed':
        filteredTasks = filteredTasks.filter(task => task.completed);
        break;
    }
    
    // Apply sorting
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
    <main className="flex flex-col min-h-screen items-center justify-center p-4 md:p-6 bg-[#F5F9FF] dark:bg-[#1a1a1a]">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>
      
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none">
          {/* Add confetti animation here */}
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-4xl">🎉</span>
          </div>
        </div>
      )}
      
      <div 
        className="bg-white dark:bg-[#212121] w-full max-w-[1000px] min-h-[480px] md:min-h-[670px] 
                   rounded-lg md:rounded-[32px] relative px-4 py-8 md:px-48 md:py-12 
                   shadow-[0px_0px_4px_0px_#00174726] dark:shadow-[0px_0px_4px_0px_#ffffff26]"
      >
        <h1 className="text-3xl md:text-5xl font-semibold mb-6 md:mb-10 font-rubik text-[#1a1a1a] dark:text-white md:my-10">
          Daily To Do List
        </h1>

        {/* Controls Bar */}
        <div className="flex flex-wrap gap-2 mb-4 items-center justify-between">
          <div className="flex gap-2">
            <button
              onClick={() => setSortOrder(prev => {
                const orders = ['newest', 'oldest', 'alphabetical', 'important'];
                const currentIndex = orders.indexOf(prev);
                return orders[(currentIndex + 1) % orders.length];
              })}
              className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-gray-100 dark:bg-gray-800 
                       hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
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
              className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-gray-100 dark:bg-gray-800 
                       hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
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

        <div className="absolute bottom-20 left-4 right-4 md:left-48 md:right-48 border-t border-[#B1BACB] dark:border-gray-700" />

        <div className="absolute bottom-8 left-4 right-4 md:left-48 md:right-48 flex justify-between items-center">
          <span className="text-gray-400 dark:text-gray-400">
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
    </main>
  );
}