import { useState, useEffect, useCallback } from "react";
import { useIsMounted } from "hooks";
import { BASE_URL } from "configs";

const useRiders = () => {
  const [riders, setRiders] = useState(null);
  const [realtime, setRealtime] = useState(false);
  const { isMounted } = useIsMounted();
  const fetchRiders = useCallback(
    async (pageSize, page, totalCount) => {
      console.log(pageSize, page, totalCount);
      console.log(pageSize ? pageSize * 0 : 0);
      try {
        const response = await fetch(
          `${BASE_URL}/users/all?role=user&limit=${pageSize}&skip=${
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
        isMounted.current && setRiders(sortArr);
        return sortArr;
      } catch (error) {
        console.log(error);
      }
    },
    [isMounted]
  );

  useEffect(() => {
    fetchRiders();
  }, [isMounted, realtime, fetchRiders]);
  return {
    fetchRiders,
    riders,
    setRealtime,
  };
};

export default useRiders;
