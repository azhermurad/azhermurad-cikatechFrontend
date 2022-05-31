import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import "./SimpleCurd.css";

const SimpleCrud = () => {
  const titleRef = useRef();
  const contentRef = useRef();
  const [success, setSuccess] = useState("");
  const [post, setpost] = useState(null);

  useEffect(() => {
    (async function () {
      const posts = await axios.get("http://localhost:4000/api/posts");
      setpost(posts.data);
    })();
  }, []);

  const updateHandler = async (id) => {
    const { title, content } = post.filter((pos) => pos._id === id)[0];
    //  /api/posts/:id

    try {
      if (!title || !content) {
        return;
      }
      const post = await axios.put("http://localhost:4000/api/posts/" + id, {
        title,
        content,
      });
      console.log(post, "post");
      setSuccess("Post successfully Updated.");
    } catch (error) {
      console.log("error", error);
      setSuccess("");
    }
  };
  const updatePost = (data, id) => {
    console.log(data);
    const updatePost = post.map((pos) => {
      if (pos._id === id) {
        return { ...pos, ...data };
      }
      return pos;
    });
    setpost(updatePost);
  };

  const submitHandler = async () => {
    try {
      const title = titleRef.current.value;
      const content = contentRef.current.value;
      if (!title || !content) {
        return;
      }
      const post = await axios.post("http://localhost:4000/api/posts", {
        title,
        content,
      });
      console.log(post, "post");
      setpost((pre)=>{
        return [...pre,{...post.data}]
      })
      setSuccess("Post successfully Added.");

    } catch (error) {
      console.log("error", error.response.data.error);
      setSuccess("");
    }
  };

  const deleteHandler = async (id) => {
    console.log(id,post)
    try {
      const deleted = await axios.delete("http://localhost:4000/api/posts/" + id);
      const deletedPost = post.filter((pos) => pos._id !== deleted.data._id);
      setpost(deletedPost)
      setSuccess("Post successfully deleted.");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section id="hero" className="d-flex" >
      <div className="container">
        {success ? <div className="alert alert-success">{success}</div> : ""}
        <table className="table table-bordered">
          <thead className="thead-dark">
            <tr>
              <th scope="col">TITLE</th>
              <th scope="col">CONTENT</th>
              <th scope="col">AKSI</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <input
                  ref={titleRef}
                  type="text"
                  name="title"
                  className="form-control"
                  placeholder="Enter Title"
                />
              </td>
              <td>
                <input
                  ref={contentRef}
                  type="text"
                  name="content"
                  className="form-control"
                  placeholder="Enter Content"
                />
              </td>
              <td>
                <button className="btn btn-success" onClick={submitHandler}>
                  Save
                </button>
              </td>
            </tr>
            {post
              ? post.map((item, index) => (
                  <tr key={index}>
                    <td>
                      <input
                        type="text"
                        className="form-control"
                        onChange={(e, index) => {
                          updatePost({ title: e.target.value }, item._id);
                        }}
                        defaultValue={item.title}
                      />
                    </td>
                    <td>
                      <input
                        className="form-control"
                        type="text"
                        onChange={(e) => {
                          updatePost({ content: e.target.value }, item._id);
                        }}
                        defaultValue={item.content}
                      />
                    </td>
                    <td>
                      <button
                        type="button"
                        onClick={() => {
                          updateHandler(item._id);
                        }}
                        className="btn btn-success btn-sm"
                      >
                        Save
                      </button>
                      <button
                        type="button"
                        className="btn btn-danger btn-sm"
                        onClick={() => {
                          deleteHandler(item._id);
                        }}
                      >
                        Hapus
                      </button>
                    </td>
                  </tr>
                ))
              : ""}
          </tbody>
        </table>
        <div></div>
      </div>
    </section>
  );
};

export default SimpleCrud;
