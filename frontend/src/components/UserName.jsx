import axios from "axios";
import { useEffect, useState } from "react";
import InfoItem from "./UserInfo";
import ToDoList from "./ToDoList";

const UserName = ({ userId }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showInfo, setShowInfo] = useState(false);

  const Icons = {
    id: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
      </svg>
    ),
    email: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    phone: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
      </svg>
    ),
    cake: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 15.546c-.523 0-1.046.151-1.5.454a2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.701 2.701 0 00-1.5-.454M9 6v2m3-2v2m3-2v2M9 3h.01M12 3h.01M15 3h.01M21 21v-7a2 2 0 00-2-2H5a2 2 0 00-2 2v7h18zm-3-9v-2a2 2 0 00-2-2H8a2 2 0 00-2 2v2h12z" />
      </svg>
    ),
    lock: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
      </svg>
    ),
    userIcon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    )
  };

  useEffect(() => {
    if (!userId) return;

    const userDetails = async () => {
      setLoading(true);
      setUser(null);
      setShowInfo(false); 
      try {
        const res = await axios.get(`https://todolist-azbb.onrender.com/user/${userId}`);
        setUser(res.data);
      } catch (err) {
        console.error("Error fetching user details:", err);
      } finally {
        setLoading(false);
      }
    };
    userDetails();
  }, [userId]);

  if (!userId) {
    return (
      <div className="text-green-500 text-center border-2 border-green-500 rounded-md p-4 px-3 flex justify-center items-center">
        <p>Please select a user from the list.</p>
      </div>
    );
  }

  if (loading || !user) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300 p-6">
      
      <div className="max-w-4xl mx-auto mb-8 flex flex-col md:flex-row justify-between items-center bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700">
        <div className="mb-4 md:mb-0">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
               Hello, <span className="text-green-600">{user.name}</span>
            </h1>
            <p className="text-gray-500 dark:text-gray-400">Manage your tasks efficiently</p>
        </div>
        
        <button 
            onClick={() => setShowInfo(!showInfo)}
            className="flex items-center gap-2 bg-gradient-to-r from-green-600 to-green-800 hover:from-green-700 hover:to-green-900 text-white font-semibold py-2 px-6 rounded-full shadow-md transform transition hover:scale-105"
        >
            {Icons.userIcon}
            {showInfo ? 'Hide Profile' : 'Show Profile'}
        </button>
      </div>

      <div className="max-w-4xl mx-auto flex flex-col gap-8">
        
        <div className={`transition-all duration-500 ease-in-out overflow-hidden ${showInfo ? 'max-h-[800px] opacity-100' : 'max-h-0 opacity-0'}`}>
            <div className="w-full bg-gray-800 dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-700 overflow-hidden">
                <div className="bg-gradient-to-br to-green-900 from-gray-900 p-6 flex items-center text-white border-b border-gray-700">
                    <div className="w-16 h-16 mr-4 rounded-full flex items-center justify-center text-4xl font-bold border-4 border-white/20 text-white bg-green-700 shadow-lg">
                        {user.name.charAt(0).toUpperCase() || "?"}
                    </div>
                    <div>
                        <h2 className="text-3xl font-bold">{user.name}</h2>
                        <p className="text-green-300 text-sm tracking-wider uppercase font-semibold">Member Profile</p>
                    </div>
                </div>

                <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4 text-right">
                    <InfoItem icon={Icons.id} label="מזהה משתמש" value={user.id} />
                    <InfoItem icon={Icons.email} label="אימייל" value={user.email} />
                    <InfoItem icon={Icons.phone} label="טלפון" value={user.phone} />
                    <InfoItem icon={Icons.cake} label="תאריך לידה" value={user.birthday} />
                </div>

                <div className="bg-gray-900/50 p-4 border-t border-gray-700 flex items-center justify-between text-sm mx-6 mb-6 rounded-lg">
                    <div className="flex items-center text-gray-400">
                        {Icons.lock}
                        <span className="ml-2 mr-2">סיסמה:</span>
                    </div>
                    <span className="font-mono bg-gray-800 px-3 py-1 rounded text-green-400 tracking-widest border border-gray-700">
                        {user.password}
                    </span>
                </div>
            </div>
        </div>

        <div className="w-full">
             <ToDoList userId={userId} />
        </div>

      </div>
    </div>
  );
};

export default UserName;