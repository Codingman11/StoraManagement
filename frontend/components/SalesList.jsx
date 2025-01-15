import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getAllSales } from "../pages/api/sales/sale";

const categories = ["Date", "Number of products", "Total Income"];

const SalesList = () => {
  const [listSales, setSales] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [groups, setGroups] = useState([]);
  const router = useRouter();

  useEffect(() => {
    saveSales();
  }, []);

  useEffect(() => {
    if (listSales.length) groupReports();
  }, [listSales]);

  const groupReports = () => {
    if (listSales) {
      const groups = listSales.reduce((groups, sale) => {
        const date = sale.Date.split("T")[0];
        if (!groups[date]) {
          groups[date] = [];
        }
        groups[date].push(sale);
        return groups;
      }, {});
      const groupArrays = Object.keys(groups).map((date) => {
        return {
          date,
          sale: groups[date],
        };
      });
      groupArrays.sort(function (a, b) {
        return new Date(b.date) - new Date(a.date);
      });
      setGroups(groupArrays);
    }
  };

  const saveSales = async () => {
    const listSales = await getAllSales();
    setSales(listSales);
    setLoaded(true);
  };

  if (!loaded) {
    return;
  }

  return (
    <div className="m-2 overflow-x-auto shadow-md sm:rounded-lg">
      <bold>
        <h1 className="py-4 text-lg uppercase w-full h-30 text-center text-gray-600 tracking-widest mb-5">
          Sales Order History
        </h1>
      </bold>
      <table className="w-full text-md text-left text-gray-500 ">
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
            const totalValue = 0;
            const numberOfProducts = 0;
            return (
              <React.Fragment key={e1.date}>
                {e1.sale.map((item) => {
                  totalValue = totalValue + item.TotalIncome;
                  numberOfProducts = numberOfProducts + item.NumberOfProducts;
                })}
                <tr className="bg-white border-b px-6 py-3">
                  <td
                    className="px-6 py-4 text-center text-blue-800 underline cursor-pointer"
                    onClick={() =>
                      router.push({
                        pathname: "/saleReports/detail",
                        query: { sale: JSON.stringify(e1.sale) },
                      })
                    }
                  >
                    {e1.date}
                  </td>
                  <td className="px-6 py-4 text-center">{numberOfProducts}</td>
                  <td className="px-6 py-4 text-center">{totalValue}</td>
                </tr>
              </React.Fragment>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default SalesList;
