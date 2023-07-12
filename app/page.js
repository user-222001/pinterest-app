import React from "react";
import Homepage from "@/components/home";
import Animation from "@/components/text.anim/text.anim";

const page = () => {
  return (
    <div>
      <div className="text-center	mt-10">
        <Animation />
      </div>
      <Homepage />
    </div>
  );
};

export default page;
