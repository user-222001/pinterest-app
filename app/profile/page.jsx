"use client";
import React, { useEffect, useState } from "react";
import app from "../../utilis/firebase.config";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  getFirestore,
  query,
  where,
} from "firebase/firestore";
import PostItem from "../../components/post/PostItem";
import { useUserAuth } from "@/components/UserAuthContext";
import Provider from "@/components/Provider/Provider";

function Profile() {
  const { user, presentid } = useUserAuth();
  const [userPost, setUserPost] = useState([]);
  const db = getFirestore(app);
  useEffect(() => {
    getUserPost();
  }, [user]);

  const getUserPost = async () => {
    setUserPost([]);
    if (user ? user.email : null) {
      const q = query(collection(db, "pins"), where("email", "==", user.email));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        let data = doc.data();
        data.id = doc.id;
        setUserPost((userPost) => [...userPost, data]);
      });
    }
  };

  const onDeletePost = async (id) => {
    await deleteDoc(doc(db, "pins", id));
    window.location.reload();
  };

  //edit posts
  const editPost = async (id, title, location, zip, desc) => {
    presentid(id, title, location, zip, desc);
    router.push("/edit");
  };

  return (
    <div className="p-8 bg-white shadow flex flex-col gap-10">
      <div className="w-48 h-48 bg-indigo-100 mx-auto rounded-full shadow-2xl  flex items-center justify-center text-indigo-500">
        {user ? (
          <img className="rounded-full" src={user.photoURL} alt="nofound" />
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-24 w-24"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
              clipRule="evenodd"
            />
          </svg>
        )}
      </div>

      <div className=" text-center  ">
        <h1 className="text-4xl font-medium text-gray-700">
          {user ? user.name : "login"}
        </h1>
        <p className="font-light text-gray-600 ">
          {user ? user.email : "login"}
        </p>
      </div>
      <div
        className="grid grid-cols-1
  sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3
  gap-5  px-10"
      >
        {userPost &&
          userPost?.map((item, index) => (
            <div key={index}>
              <PostItem post={item} />
              <button
                className="bg-lime-600 w-full p-1 mt-1
      rounded-md text-white"
                onClick={() =>
                  editPost(
                    item.id,
                    item.title,
                    item.location,
                    item.zip,
                    item.desc
                  )
                }
              >
                edit
              </button>
              <button
                className="bg-red-400 w-full p-1 mt-1
      rounded-md text-white"
                onClick={() => onDeletePost(item.id)}
              >
                Delete
              </button>
            </div>
          ))}
      </div>
    </div>
  );
}

export default Provider(Profile);
