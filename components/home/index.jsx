"use client";
import Posts from "../../components/post/Posts";
import app from "../../utilis/firebase.config";
import {
  getFirestore,
  doc,
  setDoc,
  getDoc,
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { useEffect, useState } from "react";

const Homepage = () => {
  const db = getFirestore(app);
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    getPost();
  }, []);

  const getPost = async () => {
    const querySnapshot = await getDocs(collection(db, "pins"));
    querySnapshot.forEach((doc) => {
      setPosts((posts) => [...posts, doc.data()]);
    });
  };

  //..............

  return <div className="mt-10">{posts ? <Posts posts={posts} /> : null}</div>;
};

export default Homepage;