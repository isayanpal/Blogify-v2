import React, { useContext, useEffect, useState } from "react";
import "boxicons";
import NavItem from "./NavItem";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import toast from "react-hot-toast";

const Header = () => {
  const { userInfo, setUserInfo } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:5000/api/users/profile", {
      credentials: "include",
    }).then((res) => {
      res.json().then((userInfo) => {
        setUserInfo(userInfo);
      });
    });
  }, []);

  function handleLogout() {
    fetch("http://localhost:5000/api/users/logout", {
      credentials: "include",
      method: "POST",
    });
    setUserInfo(null);
    navigate("/login");
    toast.success("Logged Out");
  }

  const user = userInfo?.username;

  const [open, setOpen] = useState(false);
  const navLinks = [
    {
      title: "Home",
      path: "/",
    },
    {
      title: "Explore",
      path: "/explore",
    },
  ];
  return (
    <div className="mt-[1rem] flex flex-row justify-between items-center">
      <Link to={"/"} className="text-3xl text-[color:var(--accent)] font-bold">
        Blogify
      </Link>
      {/* //desktop */}

      <div className="sm:flex sm:flex-row sm:gap-[20px] sm:items-center hidden">
        {navLinks.map((link) => (
          <NavItem item={link} key={link.title} />
        ))}
        {user && (
          <>
            <NavItem item={{ title: "Create", path: "/create" }} />
          </>
        )}
      </div>
      <div className="sm:flex sm:items-center hidden">
        {user ? (
          <>
            <button onClick={handleLogout}>Log out</button>
          </>
        ) : (
          <>
            <Link to={"/login"}>
              <button>Log In</button>
            </Link>
          </>
        )}
      </div>

      {/* mobile */}
      <div
        className="cursor-pointer block sm:hidden"
        onClick={() => setOpen(!open)}
      >
        <box-icon name="menu" color="#ffffff"></box-icon>
      </div>
      {open && (
        <div className="sm:hidden bg-[#3a31d8] flex flex-col absolute w-[50%] top-[50px] h-[200px] justify-center items-center gap-[10px] z-[5] right-[1.5rem] rounded-2xl">
          {navLinks.map((link) => (
            <NavItem item={link} key={link.title} />
          ))}
          {user && (
            <>
              <NavItem item={{ title: "Create", path: "/create" }} />
            </>
          )}
          <div className="flex items-center sm:hidden">
            {user ? (
              <>
                <button onClick={handleLogout}>Log out</button>
              </>
            ) : (
              <>
                <Link to={"/login"}>
                  <button>Log In</button>
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
