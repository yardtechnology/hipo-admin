import { useState, useEffect } from "react";
import { useIsMounted } from "hooks";
import { BASE_URL } from "configs";

const usePromoCodes = () => {
  const [promoCodes, setPromoCodes] = useState(null);
  const [realtime, setRealtime] = useState(false);
  const { isMounted } = useIsMounted();
  useEffect(() => {
    const fetchPromoCodes = async () => {
      try {
        const response = await fetch(`${BASE_URL}/promo-code/all-promo-code`, {
          // method: "GET",
          // body: JSON.stringify({ ...values }),
          // headers: {
          //   "Content-Type": "application/json",
          // },
        });
        const arr = await response.json();
        const sortArr = arr?.success?.data?.sort(
          (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
        );
        isMounted.current && setPromoCodes(sortArr);
      } catch (error) {
        console.log(error);
      }
    };
    fetchPromoCodes();
  }, [isMounted, realtime]);
  return {
    promoCodes,
    setRealtime,
  };
};

export default usePromoCodes;
