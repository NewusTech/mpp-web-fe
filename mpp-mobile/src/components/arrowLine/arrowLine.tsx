import React from "react";

export default function ArrowLine() {
  return (
    <div className="absolute left-1/4 top-1/2 transform -translate-y-1/2 w-1/12 h-0.5 bg-primary-700">
      <svg
        className="absolute right-0 transform translate-x-2 -translate-y-1/2 text-primary-700"
        width="24"
        height="24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
      </svg>
    </div>
  );
}
