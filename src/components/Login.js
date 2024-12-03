import React, { useState } from "react";
import { auth, provider, signInWithPopup } from "../firebaseConfig";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

const Login = ({ setUser }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignup, setIsSignup] = useState(false); // Toggle between Login and Signup mode
  const [error, setError] = useState(""); // To handle and display errors

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      setUser({
        name: user.displayName,
        email: user.email,
        photo: user.photoURL,
      });
    } catch (err) {
      setError("Google Login failed. Please try again.");
      console.error(err);
    }
  };

  const handleEmailAuth = async () => {
    setError(""); // Clear any previous errors
    try {
      if (isSignup) {
        // Sign up new user
        const result = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        setUser({ name: result.user.email, email: result.user.email });
      } else {
        // Login existing user
        const result = await signInWithEmailAndPassword(auth, email, password);
        setUser({ name: result.user.email, email: result.user.email });
      }
    } catch (err) {
      // Display error messages
      setError(err.message);
      console.error(err);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold text-blue-600 mb-8">
        {isSignup ? "Sign Up" : "Login"}
      </h1>
      <div className="bg-white p-6 rounded-lg shadow-lg w-80">
        <input
          type="email"
          placeholder="Email"
          className="block w-full p-2 mb-4 border border-gray-300 rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="block w-full p-2 mb-4 border border-gray-300 rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          onClick={handleEmailAuth}
          className="bg-green-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-green-600 transition w-full mb-4"
        >
          {isSignup ? "Sign Up" : "Login"}
        </button>
        {error && <p className="text-red-500 text-center">{error}</p>}
        <p className="text-center text-gray-600">
          {isSignup ? "Already have an account?" : "Don't have an account?"}{" "}
          <span
            className="text-blue-500 cursor-pointer"
            onClick={() => setIsSignup(!isSignup)}
          >
            {isSignup ? "Login" : "Sign Up"}
          </span>
        </p>
      </div>
      <div className="mt-6">
    
        <button
          onClick={handleGoogleLogin}
          className="bg-blue-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-600 transition"
        >
          Sign in with Google
        </button>
      </div>
    </div>
  );
};

export default Login;
