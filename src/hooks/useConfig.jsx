import { useState, useEffect } from "react";
import { useIsMounted } from "hooks";
import { BASE_URL } from "configs";

const useConfig = () => {
  const [config, setConfig] = useState(null);
  const [realtime, setRealtime] = useState(false);
  const { isMounted } = useIsMounted();
  useEffect(() => {
    const fetchCareer = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/config`, {
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
        isMounted.current && setConfig(sortArr);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCareer();
  }, [isMounted, realtime]);
  return {
    config,
    setRealtime,
  };
};

export default useConfig;
