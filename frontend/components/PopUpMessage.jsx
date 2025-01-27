import React, { useEffect, useState } from "react";

const PopUpMessage = ({ type, content }) => {
  const [message, setMessage] = useState(content);

  useEffect(() => {
    if (type != "error" && type != "success" && type != "warning") {
      type = "warning";
    }
    if (content === "") {
      setMessage("There has been an error please try again in a moment");
    }
  }, []);
  return (
    <>
      {message && (
        <div
          className={`flex p-4 mb-0 rounded-lg 
      ${type === "success" && "bg-green-100"}
      ${type === "error" && "bg-red-100"}
      ${type === "warning" && "bg-yellow-100"}
       `}
          role="alert"
        >
          <svg
            className={`flex-shrink-0 w-5 h-5 ${
              type === "success" && "text-green-700"
            }
            ${type === "error" && "text-red-700"}
            ${type === "warning" && "text-yellow-700"}`}
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
              clipRule="evenodd"
            ></path>
          </svg>
          <div
            className={`ml-3 text-sm font-medium ${
              type === "success" && "text-green-700"
            }
      ${type === "error" && "text-red-700"}
      ${type === "warning" && "text-yellow-700"}`}
          >
            {message}
          </div>
          <button
            type="button"
            onClick={() => setMessage("")}
            className={`${
              type === "success" &&
              "bg-green-100 text-green-500 focus:ring-green-400 hover:bg-green-200"
            }
        ${
          type === "error" &&
          "bg-red-100 text-red-500 focus:ring-red-400 hover:bg-red-200"
        }
        ${
          type === "warning" &&
          "bg-yellow-100 text-yellow-500 focus:ring-yellow-400 hover:bg-yellow-200"
        } ml-auto -mx-1.5 -my-1.5 rounded-lg focus:ring-2 p-1.5 inline-flex h-8 w-8`}
          >
            <span className="sr-only">Close</span>
            <svg
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              ></path>
            </svg>
          </button>
        </div>
      )}
    </>
  );
};

export default PopUpMessage;
