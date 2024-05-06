import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Register = () => {
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function handleRegister(e) {
    e.preventDefault();
    const response = await fetch(
      "https://blogify-v2.onrender.com/api/user/register",
      {
        method: "POST",
        body: JSON.stringify({ username, email, password }),
        headers: { "Content-Type": "application/json" },
      }
    );
    if (response.status !== 200) {
      toast.error("Registration failed");
      navigate("/login");
    } else {
      toast.success("Registraiton Successful");
    }
  }

  return (
    <div>
      <div className="flex flex-col gap-5 justify-center items-center">
        <h1 className="sm:text-3xl text-xl font-semibold text-[var(--accent)]">
          Get Started!
        </h1>
        <form
          onSubmit={handleRegister}
          className="flex flex-col items-center gap-[10px] sm:w-[500px] w-[350px] bg-slate-200 text-black py-10 rounded-2xl"
        >
          <label>Username</label>
          <input
            type="text"
            placeholder="Enter Username"
            className="p-2 rounded-md sm:w-[350px]"
            value={username}
            onChange={(e) => setUserName(e.target.value)}
          />
          <label>Email</label>
          <input
            type="email"
            placeholder="Enter email"
            className="p-2 rounded-md sm:w-[350px]"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label>Password</label>
          <input
            type="password"
            placeholder="Enter password"
            className="p-2 rounded-md sm:w-[350px]"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            className="w-[100px] p-2 rounded-lg text-[var(--text)] bg-[var(--accent)]"
            type="submit"
          >
            Register
          </button>
          <p>
            Already a User?{" "}
            <a href="/login" className="text-[var(--accent)]">
              Login
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
