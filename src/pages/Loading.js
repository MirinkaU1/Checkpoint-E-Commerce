import React from "react";

export default function Loading() {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="loader">
        <div className="loader-small"></div>
        <div className="loader-large"></div>
      </div>
    </div>
  );
}
