import { useState, useEffect } from "react";
import { useIsMounted } from "hooks";
import { BASE_URL } from "configs";

const useDriverPayments = () => {
  const [driverPayments, setDriverPayments] = useState(null);
  const [realtime, setRealtime] = useState(false);
  const { isMounted } = useIsMounted();
  useEffect(() => {
    const fetchFaqs = async () => {
      try {
        const response = await fetch(`${BASE_URL}/payments/all`, {
          // method: "GET",
          // body: JSON.stringify({ ...values }),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("SAL")}`,
          },
        });
        const arr = await response.json();
        console.log(arr);
        const sortArr = arr?.data?.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        isMounted.current && setDriverPayments(sortArr);
      } catch (error) {
        console.log(error);
      }
    };
    fetchFaqs();
  }, [isMounted, realtime]);
  return {
    driverPayments,
    setRealtime,
  };
};

export default useDriverPayments;
