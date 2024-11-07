import { useState } from 'react';

export default function AddTaskForm({ onAddTask }) {
  const [taskText, setTaskText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (taskText.trim()) {
      onAddTask(taskText.trim());
      setTaskText('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center mb-4 md:mb-8 w-full">
      <div className="relative w-full">
        <input
          type="text"
          placeholder="Add new list item"
          value={taskText}
          onChange={(e) => setTaskText(e.target.value)}
          className="w-full p-2 md:p-3 text-sm md:text-base shadow-sm 
            border border-[#eeeeee] dark:border-gray-700 
            rounded-md focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600 
            bg-white dark:bg-[#2a2a2a] text-gray-900 dark:text-gray-100
            placeholder-gray-500 dark:placeholder-gray-400"
        />
        <button
          type="submit"
          className="absolute right-1 top-1/2 transform -translate-y-1/2 
            px-3 md:px-4 py-1.5 md:py-2 text-sm md:text-base font-medium 
            rounded-lg shadow-md bg-blue-500 hover:bg-blue-600 
            dark:bg-blue-600 dark:hover:bg-blue-700 
            text-white transition-colors"
        >
          Add
        </button>
      </div>
    </form>
  );
}