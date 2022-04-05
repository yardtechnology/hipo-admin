import { useState, useEffect } from "react";
import { useIsMounted } from "hooks";
import { BASE_URL } from "configs";

const useVehicleCategory = () => {
  const [vehicleCategory, setVehicleCategory] = useState(null);
  const [realtime, setRealtime] = useState(false);
  const { isMounted } = useIsMounted();
  useEffect(() => {
    const fetchVehicleCategory = async () => {
      try {
        const response = await fetch(`${BASE_URL}/contact-us-forms/all`, {
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
        isMounted.current && setVehicleCategory(sortArr);
      } catch (error) {
        console.log(error);
      }
    };
    fetchVehicleCategory();
  }, [isMounted, realtime]);
  return {
    vehicleCategory,
    setRealtime,
  };
};

export default useVehicleCategory;
