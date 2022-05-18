import { useState, useEffect } from "react";
import { useIsMounted } from "hooks";
import { BASE_URL } from "configs";

const useVehicleRequests = () => {
  const [vehicleRequests, setVehicleRequests] = useState(null);
  const [realtime, setRealtime] = useState(false);
  const { isMounted } = useIsMounted();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${BASE_URL}/admin-vehicles/all?status=pending`,
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
        console.log(arr);
        isMounted.current && setVehicleRequests(arr?.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [isMounted, realtime]);
  return {
    vehicleRequests,
    setRealtime,
  };
};

export default useVehicleRequests;
