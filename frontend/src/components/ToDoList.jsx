import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Todo from "./Todo";
import ConfirmationModal from "./ConfirmationModal";
import Form from "./Form";

const ToDoList = ({ userId }) => {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [todoToDelete, setTodoToDelete] = useState(null);

  useEffect(() => {
    if (userId) {
      fetchTodos();
    }
  }, [userId]);

  const fetchTodos = async () => {
    try {
      const { data } = await axios.get(`https://todolist-azbb.onrender.com/todos?userId=${userId}`);
      setTodos(data);
    } catch (err) {
      console.error("Error fetching todos:", err);
    }
  };

  const handleAdd = async (text) => {
    const newTodo = {
      userId,
      text,
      completed: false,
      id: String(Date.now()),
    };
    try {
      const { data } = await axios.post("https://todolist-azbb.onrender.com/todos", newTodo);
      setTodos([...todos, data]);
      toast.success("Task added successfully.");
    } catch (err) {
      toast.error("Failed to add task.");
    }
  };

  const requestDelete = (todo) => {
    setTodoToDelete(todo);
    setIsModalOpen(true);
  };

  const cancelDelete = () => {
    setIsModalOpen(false);
    setTodoToDelete(null);
  };

  const confirmDelete = async () => {
    if (todoToDelete) {
      try {
        await axios.delete(`https://todolist-azbb.onrender.com/todos/${todoToDelete.id}`);
        setTodos(todos.filter((t) => t.id !== todoToDelete.id));
        toast.success(`Task "${todoToDelete.text}" deleted.`);
      } catch (err) {
        toast.error("Failed to delete task.");
      }
      setIsModalOpen(false);
      setTodoToDelete(null);
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto mb-8">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 p-6 transition-all duration-300">
        
        <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 border-b border-gray-100 dark:border-gray-700 pb-4 flex items-center">
          <span className="mr-2">📝</span> My Tasks
        </h3>

        <Form
          inputValue={inputValue}
          setInputValue={setInputValue}
          onAdd={handleAdd}
        />

        <div className="mt-6 space-y-3">
          {todos.length === 0 ? (
            <div className="flex flex-col items-center justify-center text-gray-400 py-10 border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-xl bg-gray-50 dark:bg-gray-800/50">
              <svg className="w-16 h-16 mb-4 text-gray-300 dark:text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              <p className="text-lg font-medium">No tasks yet...</p>
              <p className="text-sm mt-1 opacity-75">Add a new task to get started!</p>
            </div>
          ) : (
            todos.map((todo) => (
              <div
                key={todo.id}
                className="group transform transition-all duration-200 hover:scale-[1.01]"
              >
                <Todo
                  todo={todo}
                  todos={todos}
                  setTodos={setTodos}
                  text={todo.text}
                  completed={todo.completed}
                  onRequestDelete={requestDelete}
                />
              </div>
            ))
          )}
        </div>
      </div>

      <ConfirmationModal
        isOpen={isModalOpen}
        onCancel={cancelDelete}
        onConfirm={confirmDelete}
        todoText={todoToDelete ? todoToDelete.text : ""}
      />
    </div>
  );
};

export default ToDoList;