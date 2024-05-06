import React, { useContext } from "react";
import { Link } from "react-router-dom";
import heroImg from "../assets/heroImg.png";
// import { UserContext } from "../context/UserContext";

const Home = () => {
  // const { userInfo } = useContext(UserContext);

  // const user = userInfo?.username;
  return (
    <div className="flex flex-row items-center justify-around">
      <div className="flex flex-col items-start">
        <h1 className="uppercase text-[40px] font-medium">
          Don't just have thoughts.
        </h1>
        <p className="font-semibold text-[color:var(--accent)] text-[36px]">
          Share them.
        </p>

        <Link to={"/explore"}>
          <button className="w-[160px] h-[60px] text-center bg-[var(--primary)] rounded-[20px]">
            Explore
          </button>
        </Link>
      </div>
      <div className="w-[500px] h-[500px] hidden sm:block">
        <img src={heroImg} alt="" />
      </div>
    </div>
  );
};

export default Home;
