const Task = ({ task, onMarkCompleted }) => {
    return (
      <div
        className={`flex items-center justify-between p-2 mt-2 rounded-lg hover:bg-gray-100 ${
          task.completed ? 'bg-green-100' : ''
        }`}
        onClick={() => onMarkCompleted(task.id)}
      >
        <div className={`flex items-center ${task.completed ? 'line-through text-gray-400' : ''}`}>
          <input
            type="checkbox"
            checked={task.completed}
            readOnly
            className="mr-2 w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
          />
          <span className="sm:text-base text-sm">{task.text}</span>
        </div>
      </div>
    );
  };
  
  export default Task;