const ClearAllButton = ({ onClearTasks }) => {
    return (
      <button
        onClick={onClearTasks}
        className="bg-red-500 hover:bg-red-600 text-white rounded-lg px-4 py-2 mt-4 focus:outline-none focus:ring-2 focus:ring-red-500 sm:text-base text-sm"
      >
        Clear All
      </button>
    );
  };
  
  export default ClearAllButton;