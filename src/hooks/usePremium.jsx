import { useState, useEffect } from "react";
import { useIsMounted } from "hooks";
import { BASE_URL } from "configs";

const usePremium = () => {
  const [premium, setPremium] = useState(null);
  const [realtime, setRealtime] = useState(false);
  const { isMounted } = useIsMounted();
  useEffect(() => {
    const fetchPremiums = async () => {
      try {
        const response = await fetch(`${BASE_URL}/premiums/all`, {
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
        isMounted.current && setPremium(sortArr);
      } catch (error) {
        console.log(error);
      }
    };
    fetchPremiums();
  }, [isMounted, realtime]);
  return {
    premium,
    setRealtime,
  };
};

export default usePremium;
