import { FaCheck } from 'react-icons/fa';

export default function Task({ task, onMarkCompleted }) {
  return (
    <div
      className="flex items-center p-2 md:p-3 mt-2 rounded-lg hover:bg-gray-100 
                 dark:hover:bg-[#2a2a2a] cursor-pointer transition-colors"
      onClick={() => onMarkCompleted(task.id)}
    >
      <div
        className={`mr-2 md:mr-3 w-5 h-5 md:w-6 md:h-6 rounded-full border-2 
                   flex items-center justify-center transition-colors ${
          task.completed 
            ? 'bg-green-500 border-green-500' 
            : 'bg-white dark:bg-[#2a2a2a] border-gray-300 dark:border-gray-600'
        }`}
      >
        {task.completed && <FaCheck className="text-white text-xs md:text-sm" />}
      </div>
      <span
        className={`text-sm md:text-base ${
          task.completed 
            ? 'line-through text-gray-400 dark:text-gray-500' 
            : 'text-gray-900 dark:text-gray-200'
        } hover:text-blue-500 dark:hover:text-blue-400 transition-colors`}
      >
        {task.text}
      </span>
    </div>
  );
}