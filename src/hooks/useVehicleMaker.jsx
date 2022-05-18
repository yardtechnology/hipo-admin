import { useState, useEffect, useCallback } from "react";
import { useIsMounted } from "hooks";
import { BASE_URL } from "configs";

const useVehicleMaker = () => {
  const [vehicleMaker, setVehicleMaker] = useState([]);
  const [model, setModel] = useState([]);
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
  const fetchVehicleModel = useCallback(
    async (makerId, catId) => {
      console.log(makerId, catId);
      try {
        const response = await fetch(
          `${BASE_URL}/vehicle-model/${makerId}/${catId}`,
          {
            method: "GET",
            // body: JSON.stringify({ ...values }),
            headers: {
              Authorization: `Bearer ${localStorage.getItem("SAL")}`,
            },
          }
        );
        const arr = await response.json();
        console.log(arr);
        const sortArr = arr?.data?.sort(
          (a, b) => new Date(b?.createdAt) - new Date(a?.createdAt)
        );
        console.log(sortArr);
        isMounted.current && setModel(sortArr);
      } catch (error) {
        console.log(error);
      }
    },
    [isMounted]
  );
  console.log(model);
  return {
    fetchVehicleModel,
    model,
    vehicleMaker,
    setRealtime,
  };
};

export default useVehicleMaker;
