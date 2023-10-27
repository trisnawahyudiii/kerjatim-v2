import React from "react";
import { LoadingComponent } from "./ui";

const UnderConstruction = () => {
  return (
    <div className="relative flex w-full flex-col items-center">
      <div className="mt-12 rounded-xl bg-slate-100 p-3 text-center text-2xl font-semibold">
        UNDER CONSTRUCTION!
      </div>
      <div className="absolute bottom-0 left-0 right-0 top-0">
        <LoadingComponent />
      </div>
    </div>
  );
};

export default UnderConstruction;
