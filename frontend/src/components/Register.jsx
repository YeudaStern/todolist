import axios from "axios";
import React, { useState } from "react";

const Register = () => {
  const [formData, setFormData] = useState({});
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:3000/register", formData);
      console.log(res);
      setMessage("משתמש נרשם בהצלחה");
    } catch (err) {
      setMessage(err.response.data);
    }
  };

  return (
    <div className=" p-8 rounded-2xl shadow-2xl w-full max-w-sm border border-gray-100 relative overflow-hidden bg-white dark:bg-gray-800 dark:border-gray-700 transition-colors duration-300">
      <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-emerald-400 to-cyan-500"></div>
      
      <div className="text-center mb-8">
        <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-cyan-600">
          Create Account
        </h2>
        <p className="text-gray-400 text-sm mt-2">Join us today! It takes only few steps</p>
      </div>

      <form onSubmit={onSubmit} className="space-y-4">
        
        <div className="grid grid-cols-2 gap-4">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
              </svg>
            </div>
            <input
              className="w-full pl-10 pr-3 py-2 rounded-lg border border-gray-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition-all dark:focus:bg-gray-600 bg-gray-50 text-gray-900 dark:bg-gray-700 dark:text-white text-sm"
              type="number"
              name="id"
              placeholder="ID Number"
              onChange={handleChange}
            />
          </div>

          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <input
              className="w-full pl-10 pr-3 py-2 rounded-lg border border-gray-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition-all dark:focus:bg-gray-600 bg-gray-50 text-gray-900 dark:bg-gray-700 dark:text-white text-sm"
              type="text"
              name="name"
              placeholder="Full Name"
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <input
            className="w-full pl-10 pr-3 py-2 rounded-lg border border-gray-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition-all dark:focus:bg-gray-600 bg-gray-50 text-gray-900 dark:bg-gray-700 dark:text-white text-sm"
            type="password"
            name="password"
            placeholder="Choose Password"
            onChange={handleChange}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
            <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
            </div>
            <input
                className="w-full pl-10 pr-3 py-2 rounded-lg border border-gray-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition-all dark:focus:bg-gray-600 bg-gray-50 text-gray-900 dark:bg-gray-700 dark:text-white text-sm"
                type="text"
                name="birthday"
                placeholder="Birth Date"
                onChange={handleChange}
            />
            </div>

            <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
            </div>
            <input
                className="w-full pl-10 pr-3 py-2 rounded-lg border border-gray-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition-all dark:focus:bg-gray-600 bg-gray-50 text-gray-900 dark:bg-gray-700 dark:text-white text-sm"
                type="text"
                name="phone"
                placeholder="Phone"
                onChange={handleChange}
            />
            </div>
        </div>

        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <input
            className="w-full pl-10 pr-3 py-2 rounded-lg border border-gray-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition-all dark:focus:bg-gray-600 bg-gray-50 text-gray-900 dark:bg-gray-700 dark:text-white text-sm"
            type="email"
            name="email"
            placeholder="Email Address"
            onChange={handleChange}
          />
        </div>

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-emerald-500 to-cyan-500 text-white font-bold py-3 rounded-lg shadow-lg hover:shadow-xl hover:scale-[1.02] transform transition duration-300 active:scale-95 mt-4"
        >
          REGISTER NOW
        </button>
      </form>

      {message && (
        <div className={`mt-4 p-3 rounded-lg text-sm text-center font-medium ${message.includes("success") ? "bg-emerald-50 text-emerald-600" : "bg-red-50 text-red-600"}`}>
          {message}
        </div>
      )}
    </div>
  );
};

export default Register;