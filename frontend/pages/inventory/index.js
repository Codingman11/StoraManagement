import React, { useEffect, useState } from "react";
import ProductsList from "../../components/ProductsList";
import AddProductButton from "../../components/AddProductButton";
import PopUpMessage from "../../components/PopUpMessage";
import { useRouter } from "next/router";

const Inventory = () => {
  const router = useRouter();
  const [message, setMessage] = useState("");

  useEffect(() => {
    setMessage(router.query.message);
  }, [router.query]);

  return (
    <>
      {message && (
        <div className="m-2">
          <PopUpMessage type={"success"} content={message} />
        </div>
      )}

      <ProductsList/>
      <AddProductButton />
    </>
  );
};

export default Inventory;
