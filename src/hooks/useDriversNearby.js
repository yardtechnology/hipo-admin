import { useState, useEffect } from "react";
import { useIsMounted } from "hooks";
import { BASE_URL } from "configs";

const useDriversNearby = () => {
  const [driversNearby, setDriversNearby] = useState(null);
  const [realtime, setRealtime] = useState(false);
  const { isMounted } = useIsMounted();
  useEffect(() => {
    const fetchDrivers = async () => {
      try {
        const response = await fetch(`${BASE_URL}/get-all-active-driver`, {
          method: "GET",
          // body: JSON.stringify({ ...values }),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("SAL")}`,
          },
        });
        const arr = await response.json();
        console.log(arr);
        const sortArr = arr?.data?.sort(
          (a, b) => new Date(b?.createdAt) - new Date(a?.createdAt)
        );
        isMounted.current && setDriversNearby(sortArr);
      } catch (error) {
        console.log(error);
      }
    };
    fetchDrivers();
  }, [isMounted, realtime]);
  return {
    driversNearby,
    setRealtime,
  };
};

export default useDriversNearby;
