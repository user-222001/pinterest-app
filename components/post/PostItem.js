import React from "react";
// import { HiOutlineLocationMarker, HiOutlineCalendar } from "react-icons/hi";
// import UserInfo from "./UserInfo";
const PLACEHOLDER = "./images/default.jpg";

function PostItem({ post }) {
  return (
    <>
      {post ? (
        <div className="card bg-base-100 shadow-xl ">
          <figure className="">
            <img src={post.image ? post.image : PLACEHOLDER} alt="Shoes" />
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
