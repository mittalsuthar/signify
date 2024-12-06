import React, { useState } from "react";
import { auth, provider, signInWithPopup } from "../firebaseConfig";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

const Login = ({ setUser }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignup, setIsSignup] = useState(false);
  const [error, setError] = useState("");

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
    setError("");
    try {
      if (isSignup) {
        const result = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        setUser({
          name: result.user.email,
          email: result.user.email,
          photo: "https://ui-avatars.com/api/?name=" + encodeURIComponent(result.user.email) // Add default avatar
        });
      } else {
        const result = await signInWithEmailAndPassword(auth, email, password);
        setUser({
          name: result.user.email,
          email: result.user.email,
          photo: "https://ui-avatars.com/api/?name=" + encodeURIComponent(result.user.email) // Add default avatar
        });
      }
    } catch (err) {
      setError(err.message);
      console.error(err);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-green-100">
      <h1 className="text-4xl font-bold text-blue-600 mb-8">
        {isSignup ? "Sign Up" : "Login"}
      </h1>
      <div className="bg-white p-8 rounded-2xl shadow-xl w-96">
        <input
          type="email"
          placeholder="Email"
          className="block w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="block w-full p-3 mb-6 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          onClick={handleEmailAuth}
          className="w-full bg-gradient-to-r from-blue-500 to-green-500 text-white px-6 py-3 rounded-lg font-semibold shadow-md hover:from-blue-600 hover:to-green-600 transition duration-300 ease-in-out transform hover:-translate-y-0.5 mb-4"
        >
          {isSignup ? "Sign Up" : "Login"}
        </button>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <p className="text-center text-gray-600 mb-6">
          {isSignup ? "Already have an account?" : "Don't have an account?"}{" "}
          <span
            className="text-blue-500 cursor-pointer hover:text-blue-600 font-semibold"
            onClick={() => setIsSignup(!isSignup)}
          >
            {isSignup ? "Login" : "Sign Up"}
          </span>
        </p>
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">Or continue with</span>
          </div>
        </div>
        <div className="mt-6">
          <button
            onClick={handleGoogleLogin}
            className="w-full bg-white text-gray-700 px-6 py-3 rounded-lg font-semibold shadow-md hover:shadow-lg border border-gray-300 transition duration-300 ease-in-out transform hover:-translate-y-0.5 flex items-center justify-center"
          >
            <img
              src="https://www.google.com/favicon.ico"
              alt="Google"
              className="w-5 h-5 mr-2"
            />
            Sign in with Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;