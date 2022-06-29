import { useState, useEffect, useCallback } from "react";
import { useIsMounted } from "hooks";
import { BASE_URL } from "configs";

const useActiveRides = () => {
  const [activeRides, setActiveRides] = useState(null);
  const { isMounted } = useIsMounted();
  const [realtime, setRealtime] = useState(false);
  const fetchData = useCallback(async () => {
    try {
      const response = await fetch(`${BASE_URL}/rides/all?status=ACTIVE`, {
        // method: "GET",
        // body: JSON.stringify({ ...values }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("SAL")}`,
        },
      });
      const arr = await response.json();
      const sortArr = arr?.data?.sort(
        (a, b) => new Date(b?.createdAt) - new Date(a?.createdAt)
      );
      isMounted.current && setActiveRides(sortArr);
    } catch (error) {
      console.log(error);
    }
  }, [isMounted]);
  useEffect(() => {
    fetchData();
  }, [isMounted, realtime, fetchData]);
  return {
    activeRides,
    setRealtime,
  };
};

export default useActiveRides;
