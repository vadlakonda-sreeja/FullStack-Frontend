import React, { useState } from "react";

function Login({ setLoggedIn, setIsLogin }) {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {

    const response = await fetch("http://localhost:8081/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email,
        password
      })
    });

    const data = await response.text();

    alert(data);

    if (data === "Login successful") {

      localStorage.setItem("user", email);

      setLoggedIn(true);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-r from-blue-900 to-purple-900">

      <div className="bg-white/10 p-10 rounded-3xl backdrop-blur-md w-[400px]">

        <h1 className="text-4xl text-white font-bold mb-6 text-center">
          Login
        </h1>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-4 mb-4 rounded-xl outline-none"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-6 mb-6 rounded-xl outline-none"
        />

        <button
          onClick={handleLogin}
          className="w-full bg-cyan-500 hover:bg-cyan-600 p-4 rounded-xl text-white font-bold"
        >
          Login
        </button>

        <p className="text-white mt-4 text-center">
          Don't have account?
          <span
            className="text-cyan-300 cursor-pointer ml-2"
            onClick={() => setIsLogin(false)}
          >
            Signup
          </span>
        </p>

      </div>

    </div>
  );
}

export default Login;