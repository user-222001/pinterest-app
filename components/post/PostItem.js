import React from "react";

function PostItem({ post }) {
  const url =
    "https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/karen-nelson.png";
  return (
    <div className=" shadow-2xl rounded-2xl   ">
      <figure>
        <img
          className="rounded-t-2xl"
          src={post.image ? post.image : "no image"}
          alt="Shoes"
        />
      </figure>
      <div className="p-6">
        <h2 className="card-title">
          {post.title}
          <div className="badge badge-secondary">NEW</div>
        </h2>
        <h2 className="">{post.desc}</h2>

        <div className="mt-7">
          <h2>Posted By:</h2>

          <figcaption class="flex items-center justify-start space-x-3  ">
            {post.userImage ? (
              <>
                <img
                  class="rounded-full w-9 h-9"
                  src={post.userImage}
                  alt="noimage"
                />
              </>
            ) : (
              <>
                <img
                  class="rounded-full w-9 h-9"
                  src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/karen-nelson.png"
                  alt="profile picture"
                />
              </>
            )}
            <div class="space-y-0.5 font-medium text-gray-800 text-left">
              <div>{post.userName}</div>
              <div class="text-sm text-gray-500 ">{post.email}</div>
            </div>
          </figcaption>
        </div>
      </div>
    </div>
  );
}

export default PostItem;
