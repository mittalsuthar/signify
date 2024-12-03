import React, { useState } from "react";
import Login from "./components/Login";
import Welcome from "./components/Welcome";
import { auth, signOut } from "./firebaseConfig";

const App = () => {
  const [user, setUser] = useState(null);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null);
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div className="font-sans">
      {user ? (
        <Welcome user={user} handleLogout={handleLogout} />
      ) : (
        <Login setUser={setUser} />
      )}
    </div>
  );
};

export default App;
