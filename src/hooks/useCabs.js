import { useState, useEffect } from "react";
import { useIsMounted } from "hooks";
import { BASE_URL } from "configs";

const useCabs = () => {
  const [cabs, setCabs] = useState(null);
  const { isMounted } = useIsMounted();
  const [realtime, setRealtime] = useState(false);
  useEffect(() => {
    const fetchCabs = async () => {
      try {
        const response = await fetch(`${BASE_URL}/cities/all`, {
          // method: "GET",
          // body: JSON.stringify({ ...values }),
          // headers: {
          //   "Content-Type": "application/json",
          // },
        });
        const arr = await response.json();
        console.log(arr);
        const sortArr = arr?.data?.sort(
          (a, b) => new Date(b?.createdAt) - new Date(a?.createdAt)
        );
        isMounted.current && setCabs(sortArr);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCabs();
  }, [isMounted, realtime]);
  return {
    cabs,
    setRealtime,
  };
};

export default useCabs;
