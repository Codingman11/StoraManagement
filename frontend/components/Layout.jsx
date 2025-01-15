import Link from "next/link";
import React, { useState, useEffect } from "react";

// Roles:
// 1-Store Owner
// 2-Sales Manager
// 3-Inventory Manager
// 4-Clerk

const subMenu = [
  ["Inventory", "/inventory", "box", [1, 2, 3, 4]],
  ["Sale Reports", "/saleReports", "coin", [1, 2]],
  ["Expense Reports", "/expenseReports", "clipboard", [1, 3]],
  ["Order", "/order", "order", [1, 3]],
  ["Basket", "/basket", "cart", [1, 2, 3, 4]],
];

const Layout = ({ children, signedIn }) => {
  const [dropdown, setDropdown] = useState(false);
  const [userDetails, setUserDetails] = useState("");
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setUserDetails(JSON.parse(localStorage.getItem("UserDetails")));
    sleepFunction();
  }, []);

  const sleepFunction = async () => {
    await new Promise((r) => setTimeout(r, 500));
  };

  const logout = () => {
    if (localStorage.getItem("JWT_token")) {
      localStorage.removeItem("JWT_token");
    }
    if (localStorage.getItem("UserDetails")) {
      localStorage.removeItem("UserDetails");
    }

    if (localStorage.getItem("order")) {
      localStorage.removeItem("order");
    }
    if (localStorage.getItem("basket")) {
      localStorage.removeItem("basket");
    }
    signedIn(false);
  };

  return (
    <div className="flex flex-row min-h-screen bg-gray-100 text-gray-800">
      <aside className="h-screen sticky top-0 sidebar w-72 md:shadow transform -translate-x-full md:translate-x-0 transition-transform duration-150 ease-in bg-indigo-500">
        <div className="sidebar-header flex items-center justify-center py-4">
          <Link href="/" className="inline-flex">
            <a className="inline-flex flex-row items-center">
              <img
                src="/simplestock.png"
                className="h-10 w-10 mr-2 brightness contrast invert"
              />
              <span className="leading-10 text-gray-100 text-2xl font-bold ml-1 uppercase">
                Simple Stock
              </span>
            </a>
          </Link>
        </div>
        <div className="sidebar-content px-4 py-6">
          <ul className="flex flex-col w-full">
            <li className="my-px">
              <Link href="/">
                <a className="flex flex-row items-center h-10 px-3 rounded-lg text-gray-100 hover:bg-gray-100 hover:text-gray-700 ">
                  <span className="flex items-center justify-center text-lg text-gray-400">
                    <img src="/home.png" className="h-6 w-6" />
                  </span>
                  <span className="ml-3">Dashboard</span>
                </a>
              </Link>
            </li>
            <li className="my-px">
              <span className="flex font-medium text-l text-gray-100 px-4 my-4 uppercase">
                Management
              </span>
            </li>
            {subMenu.map((e) => (
              <li key={e[0]} className="my-px">
                {userDetails && e[3].includes(userDetails.role) && (
                  <Link href={e[1]}>
                    <a className="flex flex-row items-center h-10 px-3 rounded-lg text-gray-200 hover:bg-gray-100 hover:text-gray-700">
                      <span className="flex items-center justify-center text-lg text-gray-300">
                        <img src={`/${e[2]}.png`} className="h-6 w-6" />
                      </span>
                      <span className="ml-3"> {e[0]} </span>
                    </a>
                  </Link>
                )}
              </li>
            ))}

            <button className="my-px" onClick={logout}>
              <span className="flex font-small text-l text-gray-100 px-5 h-10 my-10 uppercase items-center justify-center rounded-lg hover:bg-gray-100 hover:text-gray-900 bg-gray-700 text-gray-100">
                Logout
              </span>
            </button>
          </ul>
        </div>
      </aside>
      <main className="main flex max-w-full flex-col flex-grow -ml-64 md:ml-0 transition-all duration-150 ease-in">
        <div className="flex flex-col min-h-full">
          <div className="grow flex flex-col">
            <header className="header bg-white shadow py-4 px-4">
              <div className="header-content flex items-center md:justify-end justify-between flex-row">
                <div className="w-1/3 md:hidden">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    onClick={() => setDropdown(!dropdown)}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                </div>
                <div className="w-1/3 flex justify-end">
                  <a className="flex flex-row items-center">
                    <img
                      src="/happy_face.jpeg"
                      className="h-10 w-10 bg-gray-200 border rounded-full"
                    />
                    <span className="flex flex-col ml-2">
                      {userDetails && (
                        <span className="w-full font-semibold tracking-wide leading-none">
                          {userDetails.name}
                        </span>
                      )}
                      <span className="w-full text-gray-500 text-xs leading-none mt-1"></span>
                    </span>
                  </a>
                </div>
              </div>
            </header>
            {dropdown && (
              <nav className="md:hidden">
                <ul className="bg-blue-100">
                  <p className="uppercase px-4 py-2 text-sm text-slate-600 font-semibold">
                    Simple Storage
                  </p>
                  {subMenu.map((e) => (
                    <li key={e[0]}>
                      {userDetails && e[3].includes(userDetails.role) && (
                        <Link href={e[1]}>
                          <a
                            onClick={() => setDropdown(false)}
                            className="flex flex-row items-center h-10 px-6 text-gray-700 hover:bg-blue-300"
                          >
                            <p className="ml-3"> {e[0]} </p>
                          </a>
                        </Link>
                      )}
                    </li>
                  ))}
                  <hr className="border shadow-sm" />
                  <button
                    className="flex h-10 w-full items-center hover:border border-red-500"
                    onClick={logout}
                  >
                    <p className="w-full"> Logout </p>
                  </button>
                </ul>
              </nav>
            )}

            <div className="main-content flex flex-col grow sm:max-w-full">
              <> {children} </>
            </div>
          </div>
          <footer className="footer px-4 py-6">
            <div className="footer-content">
              <p className="text-sm text-gray-600 text-center">
                © Simple Stock. All rights reserved by Group 3
              </p>
            </div>
          </footer>
        </div>
      </main>
    </div>
  );
};

export default Layout;
