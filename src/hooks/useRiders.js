import { useState, useEffect, useCallback } from "react";
import { useIsMounted } from "hooks";
import { BASE_URL } from "configs";

const useRiders = () => {
  const [riders, setRiders] = useState(null);
  const [realtime, setRealtime] = useState(false);
  const { isMounted } = useIsMounted();
  const fetchRiders = useCallback(
    async (pageSize, page, search) => {
      try {
        const response = await fetch(
          `${BASE_URL}/users/all?role=user&limit=${pageSize}&skip=${
            pageSize * page
          }`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("SAL")}`,
            },
          }
        );
        const arr = await response.json();
        const sortArr = arr?.data?.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        isMounted.current && setRiders(sortArr);
        return { data: sortArr, totalCount: arr?.length };
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
    realtime,
  };
};

export default useRiders;
