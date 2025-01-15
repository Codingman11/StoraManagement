import React, { useEffect, useState } from "react";

const SearchBar = ({ handleSearch }) => {
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    if (searchValue === "") {
      handleSearch(searchValue, true);
    }
  }, [searchValue]);

  const searchHelper = (e) => {
    e.preventDefault();
    handleSearch(searchValue);
  };

  return (
    <form className="flex justify-center m-2 gap-1" onSubmit={(e) => searchHelper(e)}>
      <input
        type="search"
        className="min-w-0 grow px-3 py-1.5 text-lg text-gray-700 bg-white border rounded-md border-solid border-gray-300 transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
        placeholder="Search"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
      />
      <button
        className="btn px-6 py-2 border-2 border-indigo-500 text-indigo-500 text-md leading-tight uppercase rounded-md hover:bg-indigo-500 hover:text-white focus:outline-none focus:ring-0 transition duration-150 ease-in-out"
        type="submit"
      >
        Search
      </button>
      &nbsp;
    </form>
  );
};

export default SearchBar;
