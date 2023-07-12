import React from "react";
import PostItem from "./PostItem";

function Posts({ posts }) {
  return (
    <div className="gap-6 xl:columns-4 lg:columns-3 sm:columns-1 md:columns-2 space-y-6 mx-10 ">
      {posts.map((item, index) => (
        <div key={index} className="first:aspect-video gap-9   ">
          <PostItem post={item} />
        </div>
      ))}
    </div>
  );
}

export default Posts;
