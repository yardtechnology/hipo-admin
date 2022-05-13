import { useState, useEffect } from "react";
import { useIsMounted } from "hooks";
import { BASE_URL } from "configs";

const useVehicleModels = () => {
  const [vehicleModels, setVehicleModels] = useState(null);
  const [realtimeModel, setRealtimeModel] = useState(false);
  const { isMounted } = useIsMounted();
  useEffect(() => {
    const fetchVehicleModels = async () => {
      try {
        const response = await fetch(`${BASE_URL}/vehicle-models/all`, {
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
        isMounted.current && setVehicleModels(sortArr);
      } catch (error) {
        console.log(error);
      }
    };
    fetchVehicleModels();
  }, [isMounted, realtimeModel]);
  return {
    vehicleModels,
    setRealtimeModel,
  };
};

export default useVehicleModels;
