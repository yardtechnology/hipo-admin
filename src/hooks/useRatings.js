import { useState, useEffect } from "react";
import { useIsMounted } from "hooks";
import { BASE_URL } from "configs";

const useRatings = () => {
  const [ratings, setRatings] = useState(null);
  const [realtime, setRealtime] = useState(false);
  const { isMounted } = useIsMounted();
  useEffect(() => {
    const fetchRatings = async () => {
      try {
        const response = await fetch(`${BASE_URL}/ratings/all`, {
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
        isMounted.current && setRatings(sortArr);
      } catch (error) {
        console.log(error);
      }
    };
    fetchRatings();
  }, [isMounted, realtime]);
  return {
    ratings,
    setRealtime,
  };
};

export default useRatings;
