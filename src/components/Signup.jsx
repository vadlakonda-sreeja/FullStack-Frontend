import React, { useState } from "react";

function Signup({ setIsLogin }) {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async () => {

    const response = await fetch("http://localhost:8081/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name,
        email,
        password
      })
    });

    const data = await response.text();

    alert(data);

    if (data === "Signup successful") {
      setIsLogin(true);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-r from-blue-900 to-purple-900">

      <div className="bg-white/10 p-10 rounded-3xl backdrop-blur-md w-[400px]">

        <h1 className="text-4xl text-white font-bold mb-6 text-center">
          Signup
        </h1>

        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-4 mb-4 rounded-xl outline-none"
        />

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
          className="w-full p-4 mb-6 rounded-xl outline-none"
        />

        <button
          onClick={handleSignup}
          className="w-full bg-blue-500 hover:bg-blue-600 p-4 rounded-xl text-white font-bold"
        >
          Signup
        </button>

        <p className="text-white mt-4 text-center">
          Already have account?
          <span
            className="text-cyan-300 cursor-pointer ml-2"
            onClick={() => setIsLogin(true)}
          >
            Login
          </span>
        </p>

      </div>

    </div>
  );
}

export default Signup;