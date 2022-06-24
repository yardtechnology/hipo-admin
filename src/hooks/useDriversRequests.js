import { useState, useEffect } from "react";
import { useIsMounted } from "hooks";
import { BASE_URL } from "configs";

const useDriverRequests = () => {
  const [driverRequests, setDriverRequests] = useState(null);
  const [realtime, setRealtime] = useState(false);
  const { isMounted } = useIsMounted();
  useEffect(() => {
    const fetchDrivers = async () => {
      try {
        const response = await fetch(
          `${BASE_URL}/users/all?role=driver&status=pending`,
          {
            method: "GET",
            // body: JSON.stringify({ ...values }),
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("SAL")}`,
            },
          }
        );
        const arr = await response.json();

        const sortArr = arr?.data?.sort(
          (a, b) => new Date(b?.createdAt) - new Date(a?.createdAt)
        );
        isMounted.current && setDriverRequests(sortArr);
      } catch (error) {
        console.log(error);
      }
    };
    fetchDrivers();
  }, [isMounted, realtime]);
  return {
    driverRequests,
    setRealtime,
  };
};

export default useDriverRequests;
