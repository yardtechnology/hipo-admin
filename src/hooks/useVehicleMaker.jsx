import { useState, useEffect } from "react";
import { useIsMounted } from "hooks";
import { BASE_URL } from "configs";

const useVehicleMaker = () => {
  const [vehicleMaker, setVehicleMaker] = useState(null);
  const [realtime, setRealtime] = useState(false);
  const { isMounted } = useIsMounted();
  useEffect(() => {
    const fetchVehicleMaker = async () => {
      try {
        const response = await fetch(`${BASE_URL}/vehicle-makers/all`, {
          method: "GET",
          // body: JSON.stringify({ ...values }),
          headers: {
            Authorization: `Bearer ${localStorage.getItem("SAL")}`,
          },
        });
        const arr = await response.json();
        console.log(arr);
        const sortArr = arr?.data?.sort(
          (a, b) => new Date(b?.createdAt) - new Date(a?.createdAt)
        );
        isMounted.current && setVehicleMaker(sortArr);
      } catch (error) {
        console.log(error);
      }
    };
    fetchVehicleMaker();
  }, [isMounted, realtime]);
  return {
    vehicleMaker,
    setRealtime,
  };
};

export default useVehicleMaker;
