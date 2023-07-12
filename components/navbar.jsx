"use client";
import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useUserAuth } from "../components/UserAuthContext";

const Navbar = () => {
  const { user, logOut, googleSignIn } = useUserAuth();

  const router = useRouter();

  //signin
  const handleGoogleSignIn = async (e) => {
    e.preventDefault();
    try {
      await googleSignIn();
      router.push("/");
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div className="navbar bg-slate-100 shadow-xl rounded-full flex justify-between w-[95%] px-6 ">
      <div className="flex">
        <Link href="./" className="w-28">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/35/Pinterest_Logo.svg/1200px-Pinterest_Logo.svg.png"
            alt="cdsvd"
          />
        </Link>
        <Link href="./" className="btn ml-4 btn-primary ">
          Home
        </Link>
      </div>
      <div className="flex-none gap-2">
        <div className="flex gap-4">
          <button
            onClick={() => router.push("/create-post")}
            className="btn btn-outline"
          >
            Create pin
          </button>

          {user ? (
            <>
              <button
                onClick={() => logOut()}
                className="btn btn-outline btn-error"
              >
                signOut
              </button>
              <button
                onClick={() => router.push("/profile")}
                className="btn btn-outline btn-primary"
              >
                Profile
              </button>
            </>
          ) : (
            <button
              onClick={handleGoogleSignIn}
              className="btn btn-outline btn-primary "
            >
              Login
            </button>
          )}
        </div>
        <div className="form-control">
          <input
            type="text"
            placeholder="Search"
            className="input input-bordered w-24 md:w-auto"
          />
        </div>
        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full">
              {user ? (
                <img src={user.photoURL} alt="image" />
              ) : (
                <img src="https://imgv3.fotor.com/images/gallery/AI-3D-Female-Profile-Picture.jpg" />
              )}
            </div>
          </label>
          <ul
            tabIndex={0}
            className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
          >
            <li>
              <Link href="./profile" className="justify-between">
                Profile
                <span className="badge">New</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
