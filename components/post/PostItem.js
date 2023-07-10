import React from "react";

function PostItem({ post }) {
  return (
    <>
      {post ? (
        <div className="card bg-base-100 shadow-xl ">
          <figure className="">
            <img src={post.image ? post.image : "no image"} alt="Shoes" />
          </figure>
          <div className="card-body">
            <h2 className="card-title">
              {post.title}
              <div className="badge badge-secondary">NEW</div>
            </h2>
            <p> {post.desc}</p>
          </div>
        </div>
      ) : //...........

      null}
    </>
  );
}

export default PostItem;
