import React from "react";

const Todo = ({ setTodos, todo, todos, text, onRequestDelete }) => {
  
  const handleDelete = () => {
    onRequestDelete(todo);
  };

  const handleComplete = () => {
    setTodos(
      todos.map((item) => {
        if (item.id === todo.id) {
          return {
            ...item,
            completed: !item.completed,
          };
        }
        return item;
      })
    );
  };

  return (
    <div className={`
      flex w-full items-center justify-between p-4 mb-3 rounded-xl transition-all duration-200
      border shadow-sm hover:shadow-md
      ${todo.completed 
        ? "bg-gray-50 dark:bg-gray-800/50 border-gray-100 dark:border-gray-700" 
        : "bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600"
      }
    `}>
      <div className="flex items-center space-x-4">
        <div className="relative flex items-center">
          <input
            type="checkbox"
            className="peer h-5 w-5 cursor-pointer appearance-none rounded-md border border-gray-300 dark:border-gray-500 checked:border-green-500 checked:bg-green-500 transition-all"
            checked={todo.completed}
            onChange={handleComplete}
          />
          <svg
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-3.5 h-3.5 pointer-events-none opacity-0 peer-checked:opacity-100 text-white transition-opacity"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="3"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        
        <span
          className={`text-lg font-medium transition-colors ${
            todo.completed 
              ? "line-through text-gray-400 dark:text-gray-500" 
              : "text-gray-700 dark:text-gray-100"
          }`}
        >
          {text}
        </span>
      </div>

      <button
        className="
          flex items-center gap-2
          bg-red-300 hover:bg-red-100 
          dark:bg-red-900/50 dark:hover:bg-red-900/70 
          text-red-600 dark:text-red-300 
          font-semibold py-2 px-4 rounded-lg text-sm 
          transition duration-200 ease-in-out
        "
        onClick={handleDelete}
      >
        <span>Delete</span>
        <span>🗑️</span>
      </button>

    </div>
  );
};

export default Todo;