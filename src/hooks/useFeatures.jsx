import { useState, useEffect } from "react";
import { useIsMounted } from "hooks";
import { BASE_URL } from "configs";

const useFeatures = () => {
  const [features, setFeatures] = useState(null);
  const [realtime, setRealtime] = useState(false);
  const { isMounted } = useIsMounted();
  useEffect(() => {
    const fetchPremiums = async () => {
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
        const sortArr = arr?.allFeature?.sort(
          (a, b) => new Date(b?.createdAt) - new Date(a?.createdAt)
        );
        isMounted.current && setFeatures(sortArr);
      } catch (error) {
        console.log(error);
      }
    };
    fetchPremiums();
  }, [isMounted, realtime]);
  return {
    features,
    setRealtime,
  };
};

export default useFeatures;
