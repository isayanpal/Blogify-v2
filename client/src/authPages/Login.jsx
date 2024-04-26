import React, { useContext, useState } from 'react';
import {UserContext} from "../context/UserContext";
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  // const [redirect, setRedirect] = useState(false);
  const { setUserInfo } = useContext(UserContext);
const navigate = useNavigate();
  async function handleLogin(e){
    e.preventDefault();
    const response = await fetch('http://localhost:5000/api/user/login', {
      method: 'POST',
      body: JSON.stringify({username,password}),
      headers: {'Content-Type':'application/json'},
      credentials: 'include',
    });
    if(response.ok){
      response.json().then(userInfo => {
        setUserInfo(userInfo);
        // setRedirect(true);
        navigate("/")
      });
      
    } else {
      alert('Wrong credentials');
    }
  }

  // if(redirect){
  //   return <Navigate to={'/'} />
  // }

  return (
    <div>
      <div className="flex flex-col gap-5 justify-center items-center">
        <h1 className="sm:text-3xl text-xl font-semibold text-[var(--accent)]">
          Welcome Back!
        </h1>
        <form
          onSubmit={handleLogin}
          className="flex flex-col items-center gap-[10px] sm:w-[500px] w-[350px] bg-slate-200 text-black py-10 rounded-2xl"
        >
          <label>Username</label>
          <input
            type="text"
            placeholder="Enter username"
            className="p-2 rounded-md sm:w-[350px]"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
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
            Log In
          </button>
          <p>
            Not a User?{" "}
            <a href="/signup" className="text-[var(--accent)]">
              Signup
            </a>
          </p>
        </form>
      </div>
    </div>
  )
}

export default Login
