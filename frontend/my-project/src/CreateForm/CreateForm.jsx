import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function CreateForm() {
  const date = new Date();
  date.toLocaleString();

  const navigate = useNavigate();

  const [post, setPost] = useState({
    title: "",
    description: "",
    createdAt: date.toLocaleString(),
  });

  const handleChange = (e) => {
    const { value, name } = e.target;

    setPost((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const makePost = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:3000/create", post)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));

    setPost({
      title: "",
      description: "",
    });
  };

  return (
    <div className="max-w-screen-md m-auto font-primary p-4">
      <div className="flex flex-col gap-4 mt-40">
        <h1 className="font-bold uppercase text-2xl text-center ">Post It!</h1>
        <input
          name="title"
          value={post.title}
          onChange={handleChange}
          placeholder="Title"
          className="border-2 p-2 border-slate-400 w-full rounded focus:outline-slate-900"
        />
        <input
          name="description"
          value={post.description}
          onChange={handleChange}
          placeholder="Thoughts"
          className="border-2 p-2 border-slate-400 w-full rounded focus:outline-slate-900"
        />
      </div>

      <div className="flex items-center justify-between px-4">
        <button
          onClick={makePost}
          className="my-6 ml-[3px] py-2 px-4 bg-amber-500 text-white uppercase tracking-widest text-xs font-extrabold outline-none border-none hover:scale-110 transition-all duration-300"
        >
          Create
        </button>
        <button
          onClick={() => navigate("posts")}
          className="my-6 ml-[3px] py-2 px-4 bg-amber-500 text-white uppercase tracking-widest text-xs font-extrabold outline-none border-none hover:scale-110 transition-all duration-300"
        >
          View
        </button>
      </div>
    </div>
  );
}

export default CreateForm;
