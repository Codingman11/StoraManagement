import React, { useState } from "react";
import Link from "next/link";

const AddProductButton = () => {
  return (
    <Link href="/inventory/addProduct">
      <a>
        <button className="fixed bg-cyan-400 text-md leading-tight text-black font-medium hover:bg-cyan-300 py-4 px-8 rounded-xl bottom-10 right-10 focus:outline-none focus:ring-0">
          Add Product
        </button>
      </a>
    </Link>
  );
};

export default AddProductButton;
