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
          // method: "GET",
          // body: JSON.stringify({ ...values }),
          // headers: {
          //   "Content-Type": "application/json",
          // },
        });
        const arr = await response.json();
        console.log(arr);
        // const sortArr = arr?.success?.data?.sort(
        //   (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
        // );
        isMounted.current && setCoupons(arr);
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
