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
    <form onSubmit={handleSubmit} className="flex items-center mb-8 w-full">
      <div className="relative w-full">
        <input
          type="text"
          placeholder="Add new list item"
          value={taskText}
          onChange={(e) => setTaskText(e.target.value)}
          className="w-full p-3  shadow-sm border border-[#eeeeee] rounded-md focus:ring-2   text-base"
        />
        <button
          type="submit"
          className="absolute right-1 top-1/2 transform -translate-y-1/2 px-4 py-2 font-medium rounded-lg shadow-md bg-blue-500 hover:bg-blue-600 text-white"
        >
          Add
        </button>
      </div>
    </form>
  );
};

export default AddTaskForm;
