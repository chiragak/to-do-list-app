import { useState } from 'react';
import { Trash2, Edit2, Star } from 'lucide-react';

export default function Task({ 
  task, 
  onMarkCompleted, 
  onDelete, 
  onEdit, 
  onToggleImportant,
  isEditing,
  setIsEditing 
}) {
  const [editText, setEditText] = useState(task.text);

  const handleEdit = (e) => {
    e.preventDefault();
    if (editText.trim()) {
      onEdit(task.id, editText.trim());
      setIsEditing(false);
    }
  };

  if (isEditing) {
    return (
      <form onSubmit={handleEdit} className="flex items-center gap-2">
        <input
          type="text"
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
          className="flex-1 p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 
                     dark:bg-gray-800 dark:border-gray-700"
          autoFocus
        />
        <button
          type="submit"
          className="px-3 py-1.5 bg-blue-500 text-white rounded-lg hover:bg-blue-600 
                     transition-colors"
        >
          Save
        </button>
        <button
          type="button"
          onClick={() => setIsEditing(false)}
          className="px-3 py-1.5 bg-gray-200 dark:bg-gray-700 rounded-lg 
                     hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
        >
          Cancel
        </button>
      </form>
    );
  }

  return (
    <div
      className={`group flex items-center p-2 md:p-3 rounded-lg
                  ${!task.completed && 'hover:bg-gray-100 dark:hover:bg-[#2a2a2a]'} 
                  transition-colors relative`}
    >
      {/* Checkbox */}
      <div
        onClick={() => onMarkCompleted(task.id)}
        className={`mr-2 md:mr-3 w-5 h-5 md:w-6 md:h-6 rounded-full border-2 
                   flex items-center justify-center cursor-pointer
                   transition-colors ${
          task.completed 
            ? 'bg-green-500 border-green-500' 
            : 'bg-white dark:bg-[#2a2a2a] border-gray-300 dark:border-gray-600'
        }`}
      >
        {task.completed && (
          <svg 
            className="w-3 h-3 text-white" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M5 13l4 4L19 7" 
            />
          </svg>
        )}
      </div>

      {/* Task Text */}
      <span
        className={`flex-1 text-sm md:text-base ${
          task.completed 
            ? 'line-through text-gray-400 dark:text-gray-500' 
            : 'text-gray-900 dark:text-gray-200'
        }`}
      >
        {task.text}
      </span>

      {/* Task Actions */}
      <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          onClick={() => onToggleImportant(task.id)}
          className={`p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 
                     transition-colors ${task.important ? 'text-yellow-500' : ''}`}
        >
          <Star size={16} fill={task.important ? 'currentColor' : 'none'} />
        </button>
        
        <button
          onClick={() => setIsEditing(true)}
          className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 
                     transition-colors text-gray-500 dark:text-gray-400"
        >
          <Edit2 size={16} />
        </button>
        
        <button
          onClick={() => onDelete(task.id)}
          className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 
                     transition-colors text-gray-500 dark:text-gray-400"
        >
          <Trash2 size={16} />
        </button>
      </div>

      {/* Creation Date */}
      <span className="absolute -bottom-4 right-2 text-xs text-gray-400">
        {new Date(task.createdAt).toLocaleDateString()}
      </span>
    </div>
  );
}