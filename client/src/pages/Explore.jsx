import React, { useEffect, useState } from "react";
import axios from "axios";
import Post from "../components/Post";

const Explore = () => {
  const [posts, setPosts] = useState([]);

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/post`);
        setPosts(response.data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };
    fetchPosts();
  }, []);

  return (
    <div className="my-5">
      <header>
        <h1 className="sm:mx-10 my-8 text-3xl underline decoration-[var(--accent)] font-semibold top-20 absolute z-[1]">
          Explore Blogs
        </h1>
      </header>
      {posts.length > 0 ? (
        <div className="flex flex-col items-center gap-5">
          {posts.map((post) => (
            <Post key={post._id} {...post} />
          ))}
        </div>
      ) : (
        <p>No posts available...</p>
      )}
    </div>
  );
};

export default Explore;
