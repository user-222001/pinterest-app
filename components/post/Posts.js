import React from "react";
import PostItem from "./PostItem";

function Posts({ posts }) {
  return (
    <div>
      <div className="grid grid-cols-4 gap-6 px-10">
        {posts.map((item, index) => (
          <div key={index}>
            <PostItem post={item} modal={true} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Posts;
