import React from "react";
import { Spinner } from "@material-tailwind/react";

export function CustomSpinner() {
  return (
    <div className="h-screen flex justify-center items-center">
      <Spinner className="h-16 w-16 mt-20 mx-auto text-primary animate-spin" />
    </div>
  );
}
