import React from "react";

const Welcome = ({ user, handleLogout }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-green-100">
      <h1 className="text-4xl font-bold text-green-600 mb-6">Welcome</h1>
      <div className="bg-white p-6 rounded-lg shadow-lg text-center">
        <img
          src={user.photo}
          alt="User Avatar"
          className="w-24 h-24 rounded-full mx-auto mb-4"
        />
     
        <p className="text-lg text-gray-600">Email: {user.email}</p>
        <button
          onClick={handleLogout}
          className="mt-6 bg-red-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-red-600 transition"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Welcome;
