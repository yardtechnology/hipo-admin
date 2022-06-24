import { useState, useEffect } from "react";
import { useIsMounted } from "hooks";
import { BASE_URL } from "configs";

const useOperatorRequests = () => {
  const [operatorRequests, setOperatorRequests] = useState(null);
  const [realtime, setRealtime] = useState(false);
  const { isMounted } = useIsMounted();
  useEffect(() => {
    const fetchOperators = async () => {
      try {
        const response = await fetch(
          `${BASE_URL}/users/all?role=operator&status=pending`,
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
        isMounted.current && setOperatorRequests(sortArr);
      } catch (error) {
        console.log(error);
      }
    };
    fetchOperators();
  }, [isMounted, realtime]);
  return {
    operatorRequests,
    setRealtime,
  };
};

export default useOperatorRequests;
