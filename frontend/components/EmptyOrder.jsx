import React from "react";
import { useRouter } from "next/router";

const EmptyOrder = () => {
  const router = useRouter();
  return (
    <div className="flex lg:flex-row flex-col grow h-fit justify-center items-center max-w-fit self-center">
      <div className="flex justify-center">
        <img src="/ProductNotFound.png" className="w-1/2" />
      </div>
      <div className="w-1/2 text-center px-12 flex-col justify-centerflex">
        <h3 className="w-full text-2xl font-bold max-w-full">
          There are no products in the order
        </h3>
        <p className="my-4">
          Maybe the dog ate them or maybe you can try adding new ones...
        </p>

        <button
          className="border-2 w-fit px-4 py-2 border-indigo-500 rounded self-center text-indigo-500 hover:text-indigo-700 hover:border-indigo-700"
          onClick={() => {
            router.push("/inventory");
          }}
        >
          Go back to inventory
        </button>
      </div>
    </div>
  );
};

export default EmptyOrder;
