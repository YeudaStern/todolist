import React from "react";
import toast from "react-hot-toast";

const Form = ({ inputValue, setInputValue, onAdd }) => {
  const notifyWarning = () => toast.error("Task input is empty.");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim() === "") {
      notifyWarning();
      return;
    }
    onAdd(inputValue);
    setInputValue("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-3 mb-8">
      <input
        value={inputValue}
        type="text"
        placeholder="Add a new task..."
        className="
          w-full p-3 rounded-xl outline-none transition-all duration-200
          border border-gray-200 bg-gray-50 text-gray-900 placeholder-gray-400
          focus:border-blue-500 focus:ring-2 focus:ring-blue-100 focus:bg-white
          dark:bg-gray-700/50 dark:border-gray-600 dark:text-white dark:placeholder-gray-500
          dark:focus:border-blue-400 dark:focus:ring-blue-900/30 dark:focus:bg-gray-700
        "
        onChange={(e) => setInputValue(e.target.value)}
      />
      <button
        type="submit"
        className="
          bg-blue-600 hover:bg-blue-500 dark:bg-blue-600 dark:hover:bg-blue-500
          text-white font-bold rounded-xl px-6 py-3
          shadow-lg hover:shadow-blue-500/30 transition-all duration-200
          transform active:scale-95 whitespace-nowrap flex items-center gap-2
        "
      >
        <span>Add</span>
        <span className="text-xl leading-none mb-0.5">+</span>
      </button>
    </form>
  );
};

export default Form;