"use client";
import React, { useEffect, useState } from "react";
import app from "../utilis/firebase.config";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  getFirestore,
  query,
  where,
} from "firebase/firestore";
import PostItem from "../post/PostItem";
import { useUserAuth } from "@/components/UserAuthContext";
import { useRouter } from "next/navigation";

function Todo() {
  const router = useRouter();

  const { user, presentid } = useUserAuth();

  //get data posts
  const [userPost, setUserPost] = useState([]);
  const db = getFirestore(app);
  useEffect(() => {
    getUserPost();
  }, [user]);

  const getUserPost = async () => {
    setUserPost([]);
    if (user.email) {
      const q = query(
        collection(db, "posts"),
        where("email", "==", user.email)
      );
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        let data = doc.data();
        data.id = doc.id;
        setUserPost((userPost) => [...userPost, data]);
      });
    }
  };

  //delete posts
  const onDeletePost = async (id) => {
    await deleteDoc(doc(db, "posts", id));
    window.location.reload();
  };
  //edit posts
  const editPost = async (id, title, location, zip, desc) => {
    presentid(id, title, location, zip, desc);
    router.push("/edit");
  };

  return (
    <div className=" bg-white shadow-2xl  px-10 ">
      <div className="grid md:grid-cols-3 sm:md:grid-cols-1 gap-16 ">
        {userPost &&
          userPost.map((item, index) => (
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

export default Todo;
