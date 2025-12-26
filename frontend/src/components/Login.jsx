import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = ({ onLoginSuccess }) => {
  const [id, setId] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.get(`http://localhost:3000/login?id=${id}&pass=${pass}`);
      if (res.status === 200) {
        onLoginSuccess(res.data);
        setError("");
        navigate(`/profile/${res.data.id}`);
      }
    } catch (err) {
      const { status, data } = err.response;
      if (status == 404) setError("שם משתמש וסיסמא לא תקינים");
      else setError(data);
    }
  };

  return (
    <div className="p-8 rounded-2xl shadow-2xl w-full max-w-sm border border-gray-100 relative overflow-hidden bg-white dark:bg-gray-800 dark:border-gray-700 transition-colors duration-300">
      <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-bl from-red-400 to-indigo-600"></div>
      <div className="text-center mb-8">
        <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-bl from-red-600 to-indigo-600">
          Welcome Back
        </h2>
        <p className="text-gray-400 text-sm mt-2">Please login to your account</p>
      </div>

      <div className="flex flex-col space-y-5">
        <div className="relative">
          <input
            className="w-full pl-4 pr-4 py-3 rounded-lg border border-gray-200 focus:border-red-500 focus:ring-2 focus:ring-red-200 outline-none transition-all bg-gray-50 text-gray-900 dark:bg-gray-700 dark:text-white"
            type="text"
            placeholder="User ID"
            onChange={(e) => setId(e.target.value)}
          />
        </div>

        <div className="relative">
          <input
            className="w-full pl-4 pr-4 py-3 rounded-lg border border-gray-200 focus:border-red-500 focus:ring-2 focus:ring-red-200 outline-none transition-all bg-gray-50 text-gray-900 dark:bg-gray-700 dark:text-white"
            type="password"
            placeholder="Password"
            onChange={(e) => setPass(e.target.value)}
          />
        </div>

        <button
          className="w-full bg-gradient-to-bl from-red-400 to-indigo-600 text-white font-bold py-3 rounded-lg shadow-lg hover:shadow-xl hover:scale-[1.02] transform transition duration-300 active:scale-95"
          onClick={handleLogin}
        >
          LOGIN
        </button>

        {error && (
          <div className="text-red-500 text-sm text-center bg-red-50 p-2 rounded border border-red-100">
            {error}
          </div>
        )}
      </div>
    </div>
  );
};
export default Login;