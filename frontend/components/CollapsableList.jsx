import React from "react";
import Link from "next/link";

const categories = ["Date", "Sales Report", "Total Amount"];

const CollapsableList = ({ children }) => {
  console.log(categories);
  return (
    <div className="relative overflow-hidden">
      <input
        type="checkbox"
        className="
          peer
          absolute top-0 inset-x-0
          w-full h-12
          opacity-0 z-10 cursor-pointer
        "
      />
      <div
        className="
      bg-indigo-400
      h-12 w-full
      pl-5
      flex items-center
      "
      >
        <h1 className="text-lg fonts-semibold text-white">What is Tailwind?</h1>
      </div>

      <div
        className="
      absolute top-3 right-3
      text-white
      transition-transform duration-200
      rotate-0 peer-checked:rotate-180
      "
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </div>

      <div
        className="
      bg-white
      overflow-hidden
      transition-all duration-500
      max-h-0 peer-checked:max-h-fit
      "
      >
        <div className="p-4">
          <p>{children}</p>
        </div>
      </div>
    </div>
  );
};

export default CollapsableList;
