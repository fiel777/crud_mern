import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Posts() {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();
  const [bar, setbar] = useState(false);
  const [updatedPost, setUpdatedPost] = useState({});

  useEffect(() => {
    axios
      .get("http://localhost:3000/posts")
      .then((res) => setPosts(res.data))
      .catch((err) => console.log(err));
  }, []);

  const deletePost = (id) => {
    axios
      .delete(`http://localhost:3000/delete/${id}`)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
    window.location.reload();
  };

  const saveData = () => {
    axios
      .put(`http://localhost:3000/update/${updatedPost._id}`, updatedPost)
      .then((res) => console.log(res))
      .catch((res) => console.log(res));
    window.location.reload();
  };

  const updatePost = (post) => {
    setUpdatedPost(post);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedPost((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  return (
    <div className="max-w-screen-md m-auto font-primary p-4">
      <>
        <div
          className={`absolute  inset-0 z-50  ${
            bar ? "bg-gray-400/50 flex" : "hidden"
          }`}
        >
          <div
            className={` w-[17.5rem] sm:w-[25rem] bg-white h-[20rem] shadow-sm absolute top-1/2 right-1/2 translate-x-1/2 -translate-y-1/2`}
          >
            <div className="flex justify-between w-full p-4 ">
              <h1 className="font-semibold text-base tracking-widest">
                Update a Post
              </h1>
              <span
                className="text-2xl font-black cursor-pointer hover:scale-125 transition-all duration-300 "
                onClick={() => setbar(!bar)}
              >
                X
              </span>
            </div>

            <div className="px-4 flex flex-col gap-4 my-6">
              <input
                name="title"
                value={updatedPost.title ? updatedPost.title : ""}
                onChange={handleChange}
                placeholder="Title"
                className="border-2 p-2 border-slate-400 w-full rounded focus:outline-slate-900"
              ></input>
              <input
                name="description"
                onChange={handleChange}
                value={updatedPost.description ? updatedPost.description : ""}
                placeholder="Description"
                className="border-2 p-2 border-slate-400 w-full rounded focus:outline-slate-900"
              ></input>
            </div>

            <div className="px-4 flex gap-4 items-center justify-center">
              <button
                onClick={saveData}
                className="py-2 px-4 bg-amber-500 text-white uppercase tracking-widest text-xs font-extrabold outline-none border-none hover:scale-110 transition-all duration-300"
              >
                Update
              </button>
              <button
                onClick={() => setbar(!bar)}
                className="py-2 px-4 bg-rose-500 text-white uppercase tracking-widest text-xs font-extrabold outline-none border-none hover:scale-110 transition-all duration-300"
              >
                Close
              </button>
            </div>
          </div>
        </div>
        <h1 className="text-center py-20 my-10 bg-slate-600 text-slate-50 rounded-lg text-3xl tracking-widest relative">
          Post Page
          <button
            onClick={() => navigate(-1)}
            className="py-2 px-4 absolute top-[-0.5rem] left-[-0.6rem] bg-rose-500 rounded-lg text-white uppercase tracking-widest text-xs font-extrabold outline-none border-none hover:scale-110 transition-all duration-300"
          >
            Go Back
          </button>
        </h1>

        <div className="flex flex-col gap-2 overflow-auto h-[500px] bg-slate-100 p-4 ">
          {posts.length > 0 ? (
            posts.map((post) => {
              return (
                <div className=" p-4 shadow bg-white flex flex-col gap-2 border " key={post._id}>
                  <div className="flex items-center justify-between">
                    <h1 className="text-base font-bold -tracking-normal">
                      Title: {post.title}
                    </h1>
                    <button
                      onClick={() => updatePost(post) || setbar(!bar)}
                      className="py-2 px-4 bg-amber-500 text-white uppercase tracking-widest text-xs font-extrabold outline-none border-none hover:scale-110 transition-all duration-300"
                    >
                      Update
                    </button>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="font-light text-sm ">
                      Thoughts: {post.description}
                    </p>
                    <button
                      onClick={() => deletePost(post._id)}
                      className="py-2 px-4 bg-rose-500 text-white uppercase tracking-widest text-xs font-extrabold outline-none border-none hover:scale-110 transition-all duration-300"
                    >
                      Delete
                    </button>
                  </div>
                  <h1 className="text-xs font-medium">{post.createdAt}</h1>
                </div>
              );
            })
          ) : (
            <div className="flex items-center justify-center h-screen flex-col gap-5">
              <h1 className="text-1xl font-semibold">No More Posts</h1>
              <button
                onClick={() => navigate(-1)}
                className="py-2 px-4 bg-rose-500 text-white uppercase tracking-widest text-xs font-extrabold outline-none border-none hover:scale-110 transition-all duration-300"
              >
                Go Back
              </button>
            </div>
          )}
        </div>
      </>
    </div>
  );
}

export default Posts;
