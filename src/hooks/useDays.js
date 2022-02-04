import { useState, useEffect } from "react";
import { useIsMounted } from "hooks";
import { BASE_URL } from "configs";

const useDays = () => {
  const [days, setDays] = useState(null);
  const [realtime, setRealtime] = useState(false);
  const { isMounted } = useIsMounted();
  useEffect(() => {
    const fetchDays = async () => {
      try {
        const response = await fetch(`${BASE_URL}/day/all-day`, {
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
        isMounted.current && setDays(sortArr);
      } catch (error) {
        console.log(error);
      }
    };
    fetchDays();
  }, [isMounted, realtime]);
  return {
    days,
    setRealtime,
  };
};

export default useDays;
