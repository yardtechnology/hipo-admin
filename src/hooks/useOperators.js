import { useState, useEffect } from "react";
import { useIsMounted } from "hooks";
import { BASE_URL } from "configs";

const useOperators = () => {
  const [operators, setOperators] = useState(null);
  const [realtime, setRealtime] = useState(false);
  const { isMounted } = useIsMounted();
  useEffect(() => {
    const fetchDrivers = async () => {
      try {
        const response = await fetch(
          `${BASE_URL}/users/all?role=operator&status=approved`,
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
        isMounted.current && setOperators(sortArr);
      } catch (error) {
        console.log(error);
      }
    };
    fetchDrivers();
  }, [isMounted, realtime]);
  return {
    operators,
    setRealtime,
  };
};

export default useOperators;
