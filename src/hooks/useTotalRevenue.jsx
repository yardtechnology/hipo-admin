import { useState, useEffect, useCallback } from "react";
import { useIsMounted } from "hooks";
import { BASE_URL } from "configs";

const useTotalRevenue = () => {
  const [rideData, setRideData] = useState([]);
  const [realtime, setRealtime] = useState(false);
  const { isMounted } = useIsMounted();
  const fetchData = useCallback(
    async (startDate, endDate) => {
      console.log(startDate, endDate);
      try {
        const response = await fetch(
          `${BASE_URL}/rides/total-revenue?startDate=${startDate}&endDate=${endDate}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("SAL")}`,
            },
          }
        );
        const arr = await response.json();
        console.log(arr);
        // const sortArr = arr?.data?.sort(
        //   (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        // );
        isMounted.current && setRideData(arr);
        // return { data: sortArr };
      } catch (error) {
        console.log(error);
      }
    },
    [isMounted]
  );

  useEffect(() => {
    fetchData();
  }, [isMounted, realtime, fetchData]);
  return {
    fetchData,
    rideData,
    setRealtime,
    realtime,
  };
};

export default useTotalRevenue;
