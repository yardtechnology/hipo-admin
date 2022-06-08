import { useState, useEffect, useCallback } from "react";
import { useIsMounted } from "hooks";
import { BASE_URL } from "configs";

const useDailyRide = () => {
  const [rides, setRides] = useState(null);
  const [realtime, setRealtime] = useState(false);
  const { isMounted } = useIsMounted();
  const fetchRides = useCallback(
    async (pageSize, page, totalCount) => {
      console.log(pageSize, page, totalCount);
      console.log(pageSize ? pageSize * 0 : 0);
      try {
        const response = await fetch(
          `${BASE_URL}/admin/ride/day-wise-ride?for=DAY&limit=${
            pageSize ? pageSize : 10
          }&skip=${pageSize ? pageSize * page : 0}`,
          {
            // method: "GET",
            // body: JSON.stringify({ ...values }),
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("SAL")}`,
            },
          }
        );
        const arr = await response.json();
        console.log(arr);
        const sortArr = arr?.data?.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        isMounted.current && setRides(sortArr);
        return {
          data: sortArr,
          totalCount: arr?.length,
        };
      } catch (error) {
        console.log(error);
      }
    },
    [isMounted]
  );

  useEffect(() => {
    fetchRides();
  }, [isMounted, realtime, fetchRides]);
  return {
    fetchRides,
    rides,
    setRealtime,
  };
};

export default useDailyRide;
