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
  const { user } = useUserAuth();
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
  return (
    <>
      <div className="p-16">
        <div className="p-8 bg-white shadow mt-24">
          <div className="grid grid-cols-1 md:grid-cols-1 pb-20">
            <div className="relative">
              <div className="w-48 h-48 bg-indigo-100 mx-auto rounded-full shadow-2xl absolute inset-x-0 top-0 -mt-24 flex items-center justify-center text-indigo-500">
                {user ? (
                  <img
                    className="rounded-full"
                    src={user.photoURL}
                    alt="nofound"
                  />
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
            </div>
          </div>
          <div className="mt-20 text-center  pb-12">
            <h1 className="text-4xl font-medium text-gray-700">
              {user ? user.name : "login"}
            </h1>
            <p className="font-light text-gray-600 mt-3">
              {user ? user.email : "login"}
            </p>
          </div>
          <div
            className="grid grid-cols-1
  sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4
  gap-5 mt-5 px-10"
          >
            {userPost &&
              userPost?.map((item, index) => (
                <div key={index}>
                  <PostItem post={item} modal={true} />
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
      </div>
    </>
  );
}

export default Provider(Profile);
