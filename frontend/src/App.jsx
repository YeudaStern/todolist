import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, useParams, Link, useNavigate } from "react-router-dom";
import Login from "./components/Login.jsx";
import Register from "./components/Register.jsx";
import UserName from "./components/UserName.jsx";
import Users from "./components/Users.jsx";

const UserProfilePage = () => {
  const { id } = useParams(); 
  return (
    <div className="w-full flex flex-col items-center bg-white dark:bg-gray-800 min-h-screen">
      <UserName userId={id} />
      <Link to="/" className="m-8 text-indigo-500 text-xl font-bold hover:underline">
        Back to Home
      </Link>
    </div>
  );
};

const Home = ({ loggedInUsers, onLoginSuccess }) => {
  const navigate = useNavigate();

  return (
    <div className="p-1 w-full max-w-4xl pt-10">
      <div className="flex flex-wrap justify-center gap-8 m-3 ">
        <Login onLoginSuccess={onLoginSuccess} />
        <Register />
      </div>
      
      <div className="flex justify-center mt-20 m-3">
        {loggedInUsers.length > 0 && (
          <div className="w-full max-w-md">
             <Users 
                onUserSelect={(id) => navigate(`/profile/${id}`)} 
                usersList={loggedInUsers} 
             />
          </div>
        )}
      </div>
    </div>
  );
};

function App() {
  const [loggedInUsers, setLoggedInUsers] = useState([]);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const handleLogin = (newUser) => {
    const exists = loggedInUsers.find((u) => u.id === newUser.id);
    if (!exists) {
      setLoggedInUsers([...loggedInUsers, newUser]);
    }
  };

  return (
    <BrowserRouter>
      <div className="transition-colors duration-300 bg-white dark:bg-gray-800 min-h-screen">     
           <div className="sticky  top-0 z-50 w-full flex justify-end p-2 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700 shadow-sm">
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 px-4 rounded-xl bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-yellow-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-all font-medium"
          >
            {darkMode ? '☀️ Light' : '🌙 Dark'}
          </button>
        </div>
        <div className="w-full flex flex-col items-center justify-center">
          <Routes>
            <Route path="/" element={
              <Home loggedInUsers={loggedInUsers} onLoginSuccess={handleLogin} />
            } />

            <Route path="/profile/:id" element={<UserProfilePage />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;