import React, { useState } from "react";
import "./DeletePost.css";
import { Button } from "reactstrap";

function DeletePost({ token, post, setPosts, id }) {
  //const [post, setPost] = useState("");
  const [response, setResponse] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let response = await fetch(`http://127.0.0.1:4000/post/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: token,
        },
      });

      const data = await response.json();
      setResponse(data.post);
      // Remove the deleted post from the posts state
      setPosts((prevPosts) => prevPosts.filter((p) => p._id !== post._id));
    } catch (err) {
      console.error("Error:", err);
    }
  };

  /* const handleInputChange = (e) => {
    setPost(e.target.value);
  }; */

  return (
    <div className="delete-post">
      <form onSubmit={handleSubmit}>
        {/* No need for an input field as the post Id is passed as a prop */}
        {/* <input
          type="text"
          placeholder="Post ID"
          value={post}
          onChange={handleInputChange}
        /> */}
        <Button className="delete-button" type="submit" color="secondary">
          Delete Post
        </Button>
      </form>
      {response && <p>{response}</p>}
    </div>
  );
}

export default DeletePost;