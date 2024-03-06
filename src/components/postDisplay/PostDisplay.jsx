import React from "react";
import {
  Card,
  CardBody,
  CardTitle,
  CardText,
  CardImg,
  CardFooter,
  CardColumns,
} from "reactstrap";
//import { useNavigate } from "react-router-dom";
//import { getAllPosts } from "../../lib/utils";
import { useParams } from "react-router-dom";

import "./PostDisplay.css";

import AddPost from "./addPost/AddPost";
import UpdatePost from "./updatePost/UpdatePost";
import DeletePost from "./deletePost/DeletePost";

function PostDisplay({ token, posts, setPosts }) {
  //console.log("userId in PostDisplay:", userId);
  const {userId} = useParams();
  console.log(posts);
  return (
    <div>
      <br></br>
      <br></br>
      <AddPost token={token} setPosts={setPosts} /* userId={userId} */ />
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <CardColumns>
        {posts.map((post) => (
          <Card key={post._id} className="card-custom">
            <CardBody>
              {/* <CardImg
                top
                width="100%"
                src={post.coverPhoto}
                alt="...Recipe Photo"
              />
              <br></br>
              <br></br> */}
              <CardTitle tag="h5">{post.title}</CardTitle>
              <CardText>Description: {post.description}</CardText>
              <CardText>Ingredients: {post.ingredients}</CardText>
              <CardText>Instructions: {post.instructions}</CardText>
              <CardText>Notes: {post.notes}</CardText>
              <CardText>
                <small className="text-muted">Author: {post.username}</small>
              </CardText>
            </CardBody>
            <CardFooter className="d-flex flex-column align-items-center">
              {post.userId === userId && (
                <>
                  <div className="w-100 mb-1">
                  <UpdatePost
                    token={token}
                    post={post}
                    setPosts={setPosts}
                    id={post._id}
                  />
                  </div>
                  <br></br>
                  <br></br>
                  <div className="w-100">
                  <DeletePost
                    token={token}
                    post={post}
                    setPosts={setPosts}
                    id={post._id}
                  />
                </div>  
                </>
              )}
            </CardFooter>
          </Card>
        ))}
      </CardColumns>
    </div>
  );
}

export default PostDisplay;