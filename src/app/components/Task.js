import { FaCheck } from 'react-icons/fa';

const Task = ({ task, onMarkCompleted }) => {
  return (
    <div
      className="flex items-center p-2 mt-2 rounded-lg hover:bg-gray-100 cursor-pointer"
      onClick={() => onMarkCompleted(task.id)}
    >
      <div
        className={`mr-3 w-6 h-6 rounded-full border-2 flex items-center justify-center ${
          task.completed ? 'bg-green-500 border-green-500' : 'bg-white border-gray-300'
        }`}
      >
        {task.completed && <FaCheck className="text-white text-sm" />}
      </div>
      <span
        className={`text-base ${task.completed ? 'line-through text-gray-400' : ''} hover:text-blue-500`}
      >
        {task.text}
      </span>
    </div>
  );
};

export default Task;
