import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getAllOrders } from "../pages/api/orders/order";

const categories = ["Date", "Number of products", "Total Cost"];

const ExpensesList = () => {
  const [listOrders, setOrders] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [groups, setGroups] = useState([]);
  const router = useRouter();

  useEffect(() => {
    saveOrders();
  }, []);

  useEffect(() => {
    if (listOrders.length) groupReports();
  }, [listOrders]);

  const groupReports = () => {
    if (listOrders) {
      const groups = listOrders.reduce((groups, order) => {
        const date = order.Date.split("T")[0];
        if (!groups[date]) {
          groups[date] = [];
        }
        groups[date].push(order);
        return groups;
      }, {});
      const groupArrays = Object.keys(groups).map((date) => {
        return {
          date,
          order: groups[date],
        };
      });
      groupArrays.sort(function (a, b) {
        return new Date(b.date) - new Date(a.date);
      });
      setGroups(groupArrays);
    }
  };

  const saveOrders = async () => {
    const listOrders = await getAllOrders();
    setOrders(listOrders);
    setLoaded(true);
  };

  if (!loaded) {
    return;
  }

  return (
    <div className="m-2 overflow-x-auto shadow-md sm:rounded-lg">
     <bold><h1 className="py-4 text-lg uppercase w-full h-30 text-center text-gray-600 tracking-widest mb-5">Expense Order History</h1></bold>
      <table className="w-full text-md text-center text-gray-500">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            {categories.map((e) => (
              <th scope="col" className="px-6 py-3 text-center" key={e}>
                {e}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {groups.map((e1) => {
            const totalCost = 0;
            const numberOfProducts = 0;
            return (
              <React.Fragment key={e1.date}>
                {e1.order.map((item) => {
                  totalCost = totalCost + item.TotalExpense;
                  numberOfProducts = numberOfProducts + item.NumberOfProducts;
                })}
                {console.log(e1.order)}
                <tr className="bg-white border-b px-6 py-3">
                  <td
                    className="px-6 py-4 text-center text-blue-800 underline cursor-pointer"
                    onClick={() =>
                      router.push({
                        pathname: "/expenseReports/detail",
                        query: { order: JSON.stringify(e1.order) },
                      })
                    }
                  >
                    {e1.date}
                  </td>
                  <td className="px-6 py-4 text-center">{numberOfProducts}</td>
                  <td className="px-6 py-4 text-center">{totalCost}</td>
                </tr>
              </React.Fragment>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default ExpensesList;
