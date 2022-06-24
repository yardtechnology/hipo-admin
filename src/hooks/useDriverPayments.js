import { useState, useEffect } from "react";
import { useIsMounted } from "hooks";
import { BASE_URL } from "configs";

const useDriverPayments = () => {
  const [soloDrivers, setSoloDrivers] = useState(null);
  const [realtime, setRealtime] = useState(false);
  const { isMounted } = useIsMounted();
  useEffect(() => {
    const fetchFaqs = async () => {
      try {
        const response = await fetch(`${BASE_URL}/solo-drivers/all`, {
          // method: "GET",
          // body: JSON.stringify({ ...values }),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("SAL")}`,
          },
        });
        const arr = await response.json();

        const sortArr = arr?.data?.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        isMounted.current && setSoloDrivers(sortArr);
      } catch (error) {
        console.log(error);
      }
    };
    fetchFaqs();
  }, [isMounted, realtime]);
  return {
    soloDrivers,
    setRealtime,
  };
};

export default useDriverPayments;
