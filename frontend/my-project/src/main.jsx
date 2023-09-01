import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Makepost from "./CreateForm/CreateForm.jsx";
import Viewpost from "./PostsView/Posts.jsx"

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/create" element={<Makepost />}></Route>
        <Route path="/create/posts" element={<Viewpost />}></Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
