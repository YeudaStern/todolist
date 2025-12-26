import React from "react";

const ConfirmationModal = ({ isOpen, onCancel, onConfirm, todoText }) => {
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 transition-opacity duration-300">
      <div 
        className="
          bg-white dark:bg-gray-800 
          w-full max-w-sm 
          rounded-2xl shadow-2xl 
          border border-gray-100 dark:border-gray-700 
          transform transition-all scale-100
          overflow-hidden
        "
      >
        <div className="p-6 text-center">
          <div className="mx-auto flex items-center justify-center h-14 w-14 rounded-full bg-red-100 dark:bg-red-900/30 mb-5">
            <svg 
              className="h-8 w-8 text-red-600 dark:text-red-400" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </div>

          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
            Delete Task?
          </h3>
          
          <p className="text-gray-500 dark:text-gray-400 mb-6 leading-relaxed">
            Are you sure you want to remove the task:<br/>
            <span className="font-semibold text-gray-800 dark:text-gray-200 block mt-1 break-words">
              "{todoText}"
            </span>
          </p>

          <div className="flex justify-center gap-3">
            <button
              onClick={onCancel}
              className="
                px-5 py-2.5 rounded-xl font-medium transition-colors duration-200
                bg-gray-100 text-gray-700 hover:bg-gray-200 
                dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600
                w-full
              "
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className="
                px-5 py-2.5 rounded-xl font-medium transition-colors duration-200
                bg-red-600 text-white hover:bg-red-700 
                dark:bg-red-600 dark:hover:bg-red-500
                shadow-lg shadow-red-500/30
                w-full
              "
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;