import { useState, useEffect, useCallback } from "react";
import { useIsMounted } from "hooks";
import { BASE_URL } from "configs";

const useRatings = () => {
  const [ratings, setRatings] = useState(null);
  const [realtime, setRealtime] = useState(false);
  const { isMounted } = useIsMounted();
  const fetchRatings = useCallback(
    async (pageSize, page, totalCount) => {
      console.log(pageSize, page, totalCount);
      console.log(pageSize ? pageSize * 0 : 0);
      try {
        const response = await fetch(
          `${BASE_URL}/ratings/all?limit=${pageSize}&skip=${
            pageSize ? pageSize * page : 0
          }`,
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
        isMounted.current && setRatings(sortArr);
        return sortArr;
      } catch (error) {
        console.log(error);
      }
    },
    [isMounted]
  );

  useEffect(() => {
    fetchRatings();
  }, [isMounted, realtime, fetchRatings]);
  return {
    fetchRatings,
    ratings,
    setRealtime,
  };
};

export default useRatings;
