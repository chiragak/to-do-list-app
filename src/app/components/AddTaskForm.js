import { useState } from 'react';

const AddTaskForm = ({ onAddTask }) => {
  const [taskText, setTaskText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (taskText.trim()) {
      onAddTask(taskText.trim());
      setTaskText('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center">
      <input
        type="text"
        placeholder="Add new list item"
        value={taskText}
        onChange={(e) => setTaskText(e.target.value)}
        className="flex-1 border-gray-300 rounded-l-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 sm:text-base text-sm"
      />
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-600 text-white rounded-r-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 sm:text-base text-sm"
      >
        Add
      </button>
    </form>
  );
};

export default AddTaskForm;