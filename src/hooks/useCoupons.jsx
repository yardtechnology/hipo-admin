import { useState, useEffect } from "react";
import { useIsMounted } from "hooks";
import { BASE_URL } from "configs";

const useCoupons = () => {
  const [coupons, setCoupons] = useState(null);
  const [realtime, setRealtime] = useState(false);
  const { isMounted } = useIsMounted();
  useEffect(() => {
    const fetchPromoCodes = async () => {
      try {
        const response = await fetch(`${BASE_URL}/coupons/all`, {
          method: "GET",
          // body: JSON.stringify({ ...values }),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("SAL")}`,
          },
        });
        const arr = await response.json();
        console.log(arr);
        const sortArr = arr?.coupons?.sort(
          (a, b) => new Date(b?.createdAt) - new Date(a?.createdAt)
        );
        isMounted.current && setCoupons(sortArr);
      } catch (error) {
        console.log(error);
      }
    };
    fetchPromoCodes();
  }, [isMounted, realtime]);
  return {
    coupons,
    setRealtime,
  };
};

export default useCoupons;
