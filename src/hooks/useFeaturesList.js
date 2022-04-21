import { useState, useEffect } from "react";
import { useIsMounted } from "hooks";
import { BASE_URL } from "configs";

const useFeaturesList = () => {
  const [features, setFeatures] = useState(null);
  const [realtime, setRealtime] = useState(false);
  const { isMounted } = useIsMounted();
  useEffect(() => {
    const fetchFeatures = async () => {
      try {
        const response = await fetch(`${BASE_URL}/features/all`, {
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
        isMounted.current && setFeatures(sortArr);
      } catch (error) {
        console.log(error);
      }
    };
    fetchFeatures();
  }, [isMounted, realtime]);
  return {
    features,
    setRealtime,
  };
};

export default useFeaturesList;
