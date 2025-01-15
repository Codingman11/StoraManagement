import React, { useState, useEffect } from "react";
import Link from "next/link";

const subMenu = [
  ["Inventory", "/inventory", "box", [1, 2, 3, 4]],
  ["Sale Reports", "/saleReports", "coin", [1, 2]],
  ["Expense Reports", "/expenseReports", "clipboard", [1, 3]],
  // ["Order", "/order", "order", [1, 3]],
  ["Basket", "/basket", "cart", [1, 2, 3, 4]],
];

const Main = () => {
  const [userDetails, setUserDetails] = useState("");

  useEffect(() => {
    setUserDetails(JSON.parse(localStorage.getItem("UserDetails")));
    sleepFunction();
  }, []);

  const sleepFunction = async () => {
    await new Promise((r) => setTimeout(r, 500));
  };

  return (
    <div className="grid max-w-full mx-12 mt-8 lg:m-auto grid-cols-1 grid-rows-4 lg:grid-rows-2 lg:grid-cols-2 gap-8 lg:gap-16 xl:gap-24 2xl:gap-32 items-center">
      {subMenu.map(
        (item) =>
          userDetails &&
          item[3].includes(userDetails.role) && (
            <Link href={item[1]} key={item[0]}>
              <div className="w-full lg:w-max border-2 flex flex-col hover:bg-slate-400 justify-around rounded-2xl text-center px-16 py-4 bg-slate-300 cursor-pointer">
                <div className="flex justify-center">
                  <img
                    src={`/${item[2]}.png`}
                    alt=""
                    className="h-32 w-32 lg:h-48 lg:w-48"
                  />
                </div>
                <h3 className="font-bold text-2xl mt-4"> {item[0]} </h3>
              </div>
            </Link>
          )
      )}

      {/* <Link href="/saleReports">
        <div className="border-2 flex flex-col justify-around hover:bg-slate-400 rounded-2xl text-center px-4 py-4 bg-slate-300 cursor-pointer">
          <div className="flex justify-center">
            <img src="/coin.png" alt="" className="h-32 w-32 lg:h-48 lg:w-48" />
          </div>
          <h3 className="font-bold text-2xl mt-4"> Sale Reports </h3>
        </div>
      </Link>
      <Link href="/expenseReports">
        <div className="border-2 flex flex-col justify-around hover:bg-slate-400 rounded-2xl text-center px-4 py-4 bg-slate-300 cursor-pointer">
          <div className="flex justify-center">
            <img
              src="/clipboard.png"
              alt=""
              className="h-32 w-32 lg:h-48 lg:w-48"
            />
          </div>
          <h3 className="font-bold text-2xl mt-4"> Expense Reports </h3>
        </div>
      </Link>
      <Link href="/basket">
        <div className="border-2 flex flex-col justify-around hover:bg-slate-400 rounded-2xl text-center px-4 py-4 bg-slate-300 cursor-pointer">
          <div className="flex justify-center">
            <img src="/cart.png" alt="" className="h-32 w-32 lg:h-48 lg:w-48" />
          </div>
          <h3 className="font-bold text-2xl mt-4"> Basket </h3>
        </div>
      </Link> */}
    </div>
  );
};

export default Main;
