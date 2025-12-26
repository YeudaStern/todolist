const Users = ({ onUserSelect, usersList }) => {

if (!usersList || usersList.length === 0) {
    return (
      <div className="p-6 rounded-2xl shadow-lg w-full border border-yellow-600 flex flex-col items-center justify-center text-center h-64">
        <div className="bg-gradient-to-br from-red-800 p-4 rounded-full mb-4">
          <svg className="w-8 h-8 text-amber-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
        </div>
        <h3 className="text-gray-500 font-medium">Waiting for users...</h3>
        <p className="text-gray-400 text-sm mt-1">No one has logged in yet.</p>
      </div>
    );
  }

  return (
    <div className="w-full rounded-2xl shadow-xl border border-amber-100 overflow-hidden">
      <div className="bg-gradient-to-br to-red-800 p-4 text-white flex justify-between items-center shadow-sm">
        <h3 className="font-bold text-lg tracking-wide">Active Users</h3>
        <span className="text-white border bg-amber-900 px-2 py-0.5 rounded-full text-xs font-mono">
          {usersList.length} Online
        </span>
      </div>

      <div className="p-4 flex flex-col gap-3 max-h-96 overflow-y-auto custom-scrollbar">
        {usersList.map((user) => (
          <button
            key={user.id}
            onClick={() => onUserSelect(user.id)}
            className="group flex items-center p-3 rounded-xl bg-gradient-to-br  to-red-800 border-b hover:border-amber-300 hover:bg-gray-800 transition-all duration-300 shadow-sm hover:shadow-md w-full text-left relative"
          >
            <div className="relative">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br  to-yellow-600 flex items-center justify-center font-bold shadow-inner">
                {user.name.charAt(0).toUpperCase()}
              </div>
              <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
            </div>

            <div className="ml-3 flex-1">
              <p className="font-bold transition-colors">
                {user.name}
              </p>
              <p className="text-xs text-gray-400 font-mono">ID: {user.id}</p>
            </div>

            <svg className="w-5 h-5 text-gray-300 group-hover:text-amber-400 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        ))}
      </div>
    </div>
  );
};

export default Users;
