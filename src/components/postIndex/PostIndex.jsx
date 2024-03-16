import React, { useEffect } from "react";
import { Card, CardBody, CardHeader } from "reactstrap";
import { getAllPosts } from "../../lib/utils";
import "./PostIndex.css";

import PostDisplay from "../postDisplay/PostDisplay";

function PostIndex({ token }) {
  //console.log("userId in PostIndex:", userId);
  const [posts, setPosts] = React.useState([]);

  useEffect(() => {
    getAllPosts(token).then((data) => {
      setPosts(data);
    });
  }, [token]);

  return (
    <div>
      {/* <Card className="my-2" style={{ width: "18rem" }}>
        <CardHeader>
          <h2>User Posts</h2>
        </CardHeader>
        <CardBody style={{ maxHeight: "300px", overflowY: "auto" }}>
          {posts.map((post) => {
            console.log(post);
            return <p key={post._id}>{post.text}</p>;
          })}
        </CardBody>
      </Card> */}
      <PostDisplay
        token={token}
        posts={posts}
        setPosts={setPosts} /* userId={userId} */
      />
    </div>
  );
}

export default PostIndex;