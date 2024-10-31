import React, { useState } from "react";
import { auth } from "../firebaseConfig";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import './Login.css'; 

function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);
  const navigate = useNavigate();

  const handleAuth = () => {
    if (!email) {
      alert("Please enter your email.");
      return;
    }
    if (!password) {
      alert("Please enter your password.");
      return;
    }

    if (isRegistering) {
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          console.log("Registered:", userCredential.user);
          onLogin(userCredential);
          navigate("/navigation");
        })
        .catch((error) => console.error("Error registering:", error));
    } else {
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          console.log("Logged in:", userCredential.user);
          onLogin(userCredential);
          navigate("/navigation");
        })
        .catch((error) => {
          console.error("Error logging in:", error);
          alert("Incorrect email or password. Please try again."); 
        });
    }
  };

  return (
    <div className="login-container">
      <div className="login">
        <h2>{isRegistering ? "Register" : "Login"}</h2>
        <input 
          type="email" 
          placeholder="Email" 
          onChange={(e) => setEmail(e.target.value)} 
        />
        <input 
          type="password" 
          placeholder="Password" 
          onChange={(e) => setPassword(e.target.value)} 
        />
        <button onClick={handleAuth}>
          {isRegistering ? "Register" : "Login"}
        </button>
        <p onClick={() => setIsRegistering(!isRegistering)}>
          {isRegistering ? "Already have an account? Login" : "New user? Register here"}
        </p>
      </div>
    </div>
  );
}

export default Login;
