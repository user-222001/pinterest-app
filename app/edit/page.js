"use client";
import React, { useState, useEffect } from "react";
import { useUserAuth } from "@/components/UserAuthContext";
import app from "../../components/utilis/firebase.config";
import { doc, getFirestore, getDoc, updateDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import Provider from "@/components/Provider/Provider";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function EditPost() {
  const router = useRouter();
  const database = getFirestore(app);

  //user and coming id of edit todo
  const { postid } = useUserAuth();
  console.log(postid);

  //update post
  const [titleel, settitleel] = useState("");
  const [locationel, setlocationel] = useState("");
  const [zipel, setzipel] = useState("");
  const [descel, setdescel] = useState("");

  useEffect(() => {
    settitleel(postid.title);
    setlocationel(postid.location);
    setzipel(postid.zip);
    setdescel(postid.desc);
  }, []);

  const handleSubmit = async (e) => {
    toast("Edit successfully");
    e.preventDefault();
    const updateData = doc(database, "posts", postid.id);
    await updateDoc(updateData, {
      title: titleel,
      location: locationel,
      zip: zipel,
      desc: descel,
    });
    //redirect
    router.push("/dashboard");
  };

  return (
    <div>
      <ToastContainer />
      <h2
        className="text-[30px] 
        font-extrabold text-blue-500 flex justify-start items-start mb-10"
      >
        edit Todo
      </h2>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col  items-center justify-center gap-10 "
      >
        <div className=" grid grid-cols-2 w-full gap-10">
          <label className="input-group">
            <span>TITLE</span>
            <input
              type="text"
              name="title"
              required
              className="input input-bordered"
              value={titleel}
              onChange={(e) => settitleel(e.target.value)}
            />
          </label>

          <label className="input-group">
            <span>DESCRIPTION</span>
            <input
              type="text"
              name="desc"
              value={descel}
              required
              className="input input-bordered"
              onChange={(e) => setdescel(e.target.value)}
            />
          </label>

          <label className="input-group">
            <span>LOCATION</span>
            <input
              name="location"
              required
              value={locationel}
              className="input input-bordered"
              onChange={(e) => setlocationel(e.target.value)}
            />
          </label>
          <label className="input-group">
            <span>ZIP</span>
            <input
              type="text"
              value={zipel}
              name="zip"
              required
              className="input input-bordered"
              onChange={(e) => setzipel(e.target.value)}
            />
          </label>
        </div>
        <div className="flex gap-10">
          <button
            type="submit"
            className="bg-blue-500   px-10 py-4
rounded-md text-white"
          >
            Submit
          </button>
          <button
            onClick={() => {
              router.push("/dashboard");
            }}
            type="button"
            className="bg-red-500 px-10 py-4
rounded-md text-white"
          >
            close
          </button>
        </div>
      </form>
    </div>
  );
}

export default Provider(EditPost);
