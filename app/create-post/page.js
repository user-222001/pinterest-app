"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import app from "../../utilis/firebase.config";
import { doc, getFirestore, setDoc } from "firebase/firestore";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { useUserAuth } from "../../components/UserAuthContext";
import { PhotoIcon } from "@heroicons/react/24/solid";
import { ToastContainer, toast } from "react-toastify";
import Provider from "@/components/Provider/Provider";

//..
function CreatePost() {
  const router = useRouter();
  const { user } = useUserAuth();

  const [inputs, setInputs] = useState({});
  const [file, setFile] = useState();
  const [submit, setSubmit] = useState(false);

  const db = getFirestore(app);
  const storage = getStorage(app);
  useEffect(() => {
    if (user) {
      setInputs((values) => ({ ...values, userName: user.displayName }));
      setInputs((values) => ({ ...values, userImage: user.photoURL }));
      setInputs((values) => ({ ...values, email: user.email }));
    }
  }, [user]);

  useEffect(() => {
    if (submit == true) {
      savePost();
    }
  }, [submit]);

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = async (e) => {
    toast("Pin successfully");
    e.preventDefault();
    const storageRef = ref(storage, "pinrest/" + file?.name);
    uploadBytes(storageRef, file)
      .then((snapshot) => {
        console.log("Upload a file!");
      })
      .then((resp) => {
        getDownloadURL(storageRef).then(async (url) => {
          setInputs((values) => ({ ...values, image: url }));
          setSubmit(true);
        });
      });
  };

  const savePost = async () => {
    await setDoc(doc(db, "pins", Date.now().toString()), inputs);

    //redirect
    router.push("./");
  };

  return (
    <>
      {" "}
      <ToastContainer />
      <form onSubmit={handleSubmit}>
        <div className="space-y-12 px-28 ">
          <div className="mt-6 flex items-center justify-end gap-x-6">
            <button
              onClick={() => {
                router.push("/");
              }}
              type="button"
              className="text-sm font-semibold leading-6 text-gray-900"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Save
            </button>
          </div>
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className=" font-bold leading-7 text-gray-900 text-xl ">
              Post a Pin
            </h2>

            <div className="mt-8 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-4">
                <label
                  htmlFor="username"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Add your title
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                    <input
                      type="text"
                      name="title"
                      required
                      id="title"
                      autoComplete="title"
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>

              <div className="col-span-full">
                <label
                  htmlFor="about"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  About
                </label>
                <div className="mt-2">
                  <textarea
                    name="desc"
                    type="text"
                    required
                    id="desc"
                    onChange={handleChange}
                    rows={3}
                    autoComplete="desc"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
                <p className="mt-3 text-sm leading-6 text-gray-600">
                  Write a few sentences about your pin.
                </p>
              </div>

              <div className="col-span-full">
                <label
                  htmlFor="cover-photo"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Cover photo
                </label>
                <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                  <div className="text-center">
                    <PhotoIcon
                      className="mx-auto h-12 w-12 text-gray-300"
                      aria-hidden="true"
                    />
                    <div className="mt-4 flex text-sm leading-6 text-gray-600">
                      <label
                        htmlFor="file-upload"
                        className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                      >
                        <span>Upload a file</span>
                        <input
                          type="file"
                          onChange={(e) => setFile(e.target.files[0])}
                          accept="image/gif, image/jpeg, image/png"
                          id="file-upload"
                          className="sr-only"
                        />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs leading-5 text-gray-600">
                      PNG, JPG, GIF up to 10MB
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}

export default Provider(CreatePost);
