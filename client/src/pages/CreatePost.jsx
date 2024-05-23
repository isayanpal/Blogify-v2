import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import Editor from "../components/Editor";
import toast from "react-hot-toast";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [files, setFiles] = useState("");
  const [redirect, setRedirect] = useState(false);

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  async function createNewPost(e) {
    const data = new FormData();
    data.set("title", title);
    data.set("summary", summary);
    data.set("content", content);
    data.set("file", files[0]);
    e.preventDefault();

    // const postData = {
    //   title: title,
    //   summary: summary,
    //   content: content,
    //   file: files[0],
    // };
    try {
      const response = await fetch(`${API_BASE_URL}/api/post`, {
        method: "POST",
        // headers: {
        //   "Content-Type": "application/json",
        // },
        body: data,
        credentials: "include",
      });
      if (response.ok) {
        setRedirect(true);
        toast.success("Post created successfully");
      } else {
        const errorData = await response.json();
        toast.error(`Error: ${errorData.message}`);
      }
    } catch (error) {
      toast.error(`Network error: ${error.message}`);
    }
  }

  if (redirect) {
    return <Navigate to={"/explore"} />;
  }
  return (
    <div className="flex flex-col items-center gap-[100px]">
      <div>
        <h1 className="text-3xl font-semibold underline decoration-[var(--accent)]">
          Create Your Blog
        </h1>
      </div>
      <div>
        <form
          className="flex flex-col items-start gap-10"
          onSubmit={createNewPost}
        >
          <input
            className="sm:w-[400px] w-[350px] p-[.5rem] rounded-xl text-black"
            type="title"
            placeholder={"Title"}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            className="sm:w-[400px] w-[350px] p-[.5rem] rounded-xl text-black"
            type="summary"
            placeholder={"Summary"}
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
          />
          <input type="file" onChange={(e) => setFiles(e.target.files)} />
          <Editor onChange={setContent} value={content} />
          <button className="w-[160px] h-[60px] text-center bg-[var(--primary)] rounded-[20px]">
            Create Post
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreatePost;
