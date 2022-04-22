import { useState, useEffect } from "react";
import { useIsMounted } from "hooks";
import { BASE_URL } from "configs";

const useRiders = () => {
  const [riders, setRiders] = useState(null);
  const [realtime, setRealtime] = useState(false);
  const { isMounted } = useIsMounted();
  useEffect(() => {
    const fetchRiders = async () => {
      try {
        const response = await fetch(`${BASE_URL}/users/all?role=user`, {
          method: "GET",
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
        isMounted.current && setRiders(sortArr);
      } catch (error) {
        console.log(error);
      }
    };
    fetchRiders();
  }, [isMounted, realtime]);
  return {
    riders,
    setRealtime,
  };
};

export default useRiders;
